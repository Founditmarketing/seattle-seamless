/**
 * Lead-notification email — sent in parallel with the Jobber API call
 * so the owner never loses a lead even if Jobber is down, the token is
 * stale (cold-start refresh-token rotation issue), or the account loses
 * API access for any reason.
 *
 * Powered by Resend (resend.com). Their free tier covers 100 emails/day
 * which is way more than this site will ever produce — gutter leads
 * spike maybe 10-15/day in fall, dozens lower the rest of the year.
 *
 * Env vars:
 *   RESEND_API_KEY     — required to enable. Without it, sendLeadEmail
 *                        returns { ok: false, skipped: true } and the
 *                        caller can decide whether that's a real failure.
 *                        Local dev without a Resend account still works.
 *   LEAD_NOTIFY_FROM   — sender, defaults to
 *                        "Seamless Gutters Website <leads@seamlessgutters4less.com>".
 *                        Must be a verified domain in Resend or send
 *                        will fail with "domain not verified".
 *   LEAD_NOTIFY_TO     — recipient, defaults to info@seamlessgutters4less.com.
 *                        Multiple addresses can be comma-separated.
 */

const RESEND_API_URL = "https://api.resend.com/emails";

function envOrDefault(name, fallback) {
  const v = process.env[name];
  if (v === undefined || v === "") return fallback;
  return v;
}

/**
 * Build the HTML body of the lead email. We deliberately keep this
 * editorial-looking rather than form-template-y so it doesn't trip
 * spam filters that downweight transactional spam-shaped messages.
 */
function buildHtml(lead) {
  const stamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const escape = (s) => String(s ?? "")
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  return `<!doctype html>
  <html><body style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;background:#F6F3ED;margin:0;padding:24px;color:#18202E;">
    <table cellpadding="0" cellspacing="0" border="0" style="max-width:560px;margin:0 auto;background:#FDFCFA;border:1px solid #E8E2D6;border-radius:12px;overflow:hidden;">
      <tr><td style="background:#0D1638;color:#fff;padding:18px 22px;">
        <div style="font:600 11px/1 -apple-system,sans-serif;letter-spacing:0.25em;text-transform:uppercase;color:#C68A40;margin-bottom:8px">New estimate request</div>
        <div style="font:700 22px/1.2 Georgia,serif;">${escape(lead.name) || "Anonymous lead"}</div>
      </td></tr>
      <tr><td style="padding:20px 22px;">
        ${row("Phone",   lead.phone   ? `<a href="tel:${escape(lead.phone)}" style="color:#C68A40;text-decoration:none;font-weight:700">${escape(lead.phone)}</a>` : "—")}
        ${row("Email",   lead.email   ? `<a href="mailto:${escape(lead.email)}" style="color:#C68A40;text-decoration:none">${escape(lead.email)}</a>` : "—")}
        ${row("Address", escape(lead.address) || "—")}
        ${row("Service", escape(lead.service) || "—")}
        ${row("Message", escape(lead.message) || "—")}
      </td></tr>
      <tr><td style="padding:14px 22px;border-top:1px solid #E8E2D6;color:#74756A;font:400 12px/1.5 -apple-system,sans-serif;">
        <strong>Source:</strong> ${escape(lead.source || "Website")}<br>
        <strong>Received:</strong> ${escape(stamp)} (Pacific)<br>
        <strong>Jobber:</strong> ${lead.jobberOk ? "✓ Saved to Jobber as request " + escape(lead.jobberRequestId || "(no id)") : "✗ NOT saved to Jobber — " + escape(lead.jobberError || "unknown failure") + ". Follow up manually."}
      </td></tr>
    </table>
    <div style="text-align:center;margin-top:14px;font:400 11px/1.4 -apple-system,sans-serif;color:#74756A;">
      Sent automatically by Seamless Gutters 4 Less website.
    </div>
  </body></html>`;
}

function row(label, value) {
  return `<table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:10px"><tr>
    <td width="80" valign="top" style="color:#74756A;font:600 11px/1.6 -apple-system,sans-serif;letter-spacing:0.18em;text-transform:uppercase;">${label}</td>
    <td valign="top" style="font:400 15px/1.5 -apple-system,sans-serif;color:#18202E;">${value}</td>
  </tr></table>`;
}

function buildText(lead) {
  return [
    `NEW ESTIMATE REQUEST`,
    ``,
    `Name:    ${lead.name || "(none)"}`,
    `Phone:   ${lead.phone || "(none)"}`,
    `Email:   ${lead.email || "(none)"}`,
    `Address: ${lead.address || "(none)"}`,
    `Service: ${lead.service || "(none)"}`,
    `Message: ${lead.message || "(none)"}`,
    ``,
    `Source:  ${lead.source || "Website"}`,
    `Jobber:  ${lead.jobberOk
      ? `Saved as request ${lead.jobberRequestId || "(no id)"}`
      : `NOT saved — ${lead.jobberError || "unknown failure"}. Follow up manually.`}`,
  ].join("\n");
}

export async function sendLeadEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, skipped: true, reason: "RESEND_API_KEY not configured" };

  const from = envOrDefault(
    "LEAD_NOTIFY_FROM",
    "Seamless Gutters Website <leads@seamlessgutters4less.com>",
  );
  const to = envOrDefault("LEAD_NOTIFY_TO", "info@seamlessgutters4less.com")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const subject = lead.jobberOk
    ? `New lead — ${lead.name || "Anonymous"} · ${lead.service || "Estimate"}`
    : `[FOLLOW UP] New lead — ${lead.name || "Anonymous"} · ${lead.service || "Estimate"} (Jobber failed)`;

  const replyTo = lead.email || undefined;

  const res = await fetch(RESEND_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type":  "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html:    buildHtml(lead),
      text:    buildText(lead),
      reply_to: replyTo,
    }),
  });

  const raw = await res.text();
  let json = {};
  try { json = JSON.parse(raw); } catch { /* not JSON */ }

  if (!res.ok) {
    console.error("[notify] Resend send failed", {
      status: res.status,
      statusText: res.statusText,
      bodySnippet: raw.slice(0, 400),
    });
    return { ok: false, status: res.status, error: json?.message || `HTTP ${res.status}` };
  }
  return { ok: true, id: json.id };
}
