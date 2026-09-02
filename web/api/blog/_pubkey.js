/**
 * Found-IT Marketing's blog-engine PUBLIC key (Ed25519, SPKI PEM).
 *
 * The Found-IT CRM signs every management request (list / delete / ingest /
 * assignment) with the matching PRIVATE key, which lives only in the CRM's
 * app_settings (SITE_BLOG_SIGNING_KEY). This file is deliberately committed —
 * a public key is not a secret — and is what lets client sites run the blog
 * engine with ZERO env vars: nothing to configure per site, nothing to leak.
 *
 * Rotating the agency key = update the CRM setting + push this file to every
 * engine site.
 */
export const FOUNDIT_BLOG_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MCowBQYDK2VwAyEAObaAhiV7yC+RQetnBtuRzLQJXt14llxYbSHLKFiDhrQ=
-----END PUBLIC KEY-----`;
