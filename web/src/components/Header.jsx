import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, Menu, X, ArrowRight, MessageSquare } from "lucide-react";
import { SITE } from "../data/site";
import { useScrolled } from "../hooks/useScrolled";

const NAV = [
  { label: "Services", href: "/services/seamless-gutter-installation/" },
  { label: "Gallery",  href: "/gallery/" },
  { label: "Reviews",  href: "/reviews/" },
  { label: "About",    href: "/about/" },
  { label: "FAQ",      href: "/faq/" },
  { label: "Contact",  href: "/contact/" },
];

/**
 * Brand mark — the bitmap /logo.png is the only mark we ship. It already
 * contains the "Seamless Gutters 4 Less" wordmark in its bottom half, so
 * pairing it with a typographic wordmark next to it (the previous setup)
 * created a duplicated brand-mark stack. The drop-shadow gives the dark
 * black portion of the logo enough lift to read on the navy header.
 */
/**
 * Brand lockup — the bitmap logo (which already contains "Seamless Gutters
 * 4 Less" typography) paired with a small copper "VETERAN OWNED" tagline
 * directly underneath. This is the only brand mark on the site.
 */
/**
 * Brandmark size variants — `compact` is what the header uses once
 * `scrolled` is true so the logo doesn't dominate the viewport while
 * the user is reading content. `default` is the at-top hero state.
 *
 * Sizing rationale (owner-requested 2026-05-15: "logo a little bigger,
 * give it space to breathe"):
 *   - default  56 / 64 / 80 px  → reads as a real brand mark on the
 *     hero, no longer postage-stamp-sized on desktop.
 *   - compact  48 / 56 px       → still trims down on scroll so the
 *     pinned header doesn't dominate while reading the page.
 *
 * The parent header container is bumped in lockstep (see below) so
 * neither variant gets pinched against the top/bottom edges — the
 * "space to breathe" is real vertical room inside a taller header.
 */
function Brandmark({ compact = false, className = "" }) {
  return (
    <div className={`flex flex-col items-start ${className}`}>
      <img
        src="/images/scraped/SG4Llogo.png"
        alt={SITE.name}
        width={320}
        height={170}
        decoding="async"
        fetchPriority="high"
        className={`w-auto object-contain drop-shadow-[0_4px_14px_rgba(0,0,0,0.55)] transition-[height] duration-300 ${
          compact
            ? "h-12 md:h-14"
            : "h-14 md:h-16 lg:h-20"
        }`}
      />
      {!compact && (
        <span
          className="hidden md:flex items-center gap-2 mt-1.5 text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold leading-none"
          aria-hidden
        >
          <span className="h-px w-5 bg-[var(--color-copper)]/60" />
          Veteran Owned
        </span>
      )}
    </div>
  );
}

export default function Header({ onEstimate }) {
  const scrolled = useScrolled(80);
  const [mobileNav, setMobileNav] = useState(false);
  const { pathname } = useLocation();

  /* Lock body scroll while the mobile menu is open. */
  useEffect(() => {
    document.body.style.overflow = mobileNav ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileNav]);

  /* Close menu on route change. */
  useEffect(() => { setMobileNav(false); }, [pathname]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "material-dark border-b border-white/10"
            : "bg-transparent border-b border-transparent"
        }`}
        style={{ paddingTop: "var(--safe-top)" }}
      >
        <div
          /* Container height tracks the Brandmark variants above so the
           * logo never touches the top or bottom edge. Default state has
           * generous padding so the wordmark + Veteran-Owned tagline
           * (which adds ~16px below the logo) sit comfortably; compact
           * state collapses to a tighter rail once the user has
           * scrolled. */
          className={`max-w-[var(--max-content)] mx-auto px-[var(--space-page-x)] flex items-center justify-between transition-all duration-300 ${
            scrolled ? "h-16 md:h-20" : "h-20 md:h-24 lg:h-28"
          }`}
        >
          <Link to="/" className="haptic flex items-center gap-2.5 group" aria-label={`${SITE.name} home`}>
            <Brandmark compact={scrolled} />
          </Link>

          <nav
            className="hidden lg:flex items-center gap-8 text-sm text-white/85"
            aria-label="Primary"
          >
            {NAV.map((n) => (
              <Link
                key={n.label}
                to={n.href}
                className={`haptic hover:text-[var(--color-copper)] transition-colors relative group ${
                  pathname.startsWith(n.href.replace(/\/$/, "")) ? "text-[var(--color-copper)]" : ""
                }`}
              >
                {n.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[var(--color-copper)] group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={SITE.phone.tel}
              className="haptic hidden md:flex items-center gap-2 text-white hover:text-white text-[15px]"
              style={{ fontFamily: "system-ui, -apple-system, Arial, sans-serif", fontWeight: 700 }}
            >
              <Phone className="w-4 h-4" />
              {SITE.phone.display}
            </a>
            <button
              onClick={onEstimate}
              className="haptic-primary hidden md:inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-5 py-2.5 text-sm font-semibold rounded-full shadow-lg shadow-[var(--color-copper)]/20"
            >
              Free Estimate <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileNav((v) => !v)}
              className="haptic lg:hidden text-white p-2 -mr-2 rounded-full"
              aria-label={mobileNav ? "Close menu" : "Open menu"}
              aria-expanded={mobileNav}
            >
              {mobileNav ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu sheet. Opaque so hero text can't bleed through. */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] bg-[var(--color-royal-deep)] flex flex-col overflow-y-auto transition-[opacity,transform] duration-400 ${
          mobileNav
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
        style={{
          paddingTop: "calc(var(--safe-top) + 1.25rem)",
          paddingBottom: "calc(var(--safe-bottom) + 2.5rem)",
        }}
        aria-hidden={!mobileNav}
        role="dialog"
        aria-label="Site menu"
      >
        <div className="absolute inset-0 grain opacity-10 pointer-events-none" aria-hidden />

        <div className="relative flex items-center justify-between px-[var(--space-page-x)]">
          <Brandmark compact />
          <button
            onClick={() => setMobileNav(false)}
            className="haptic text-white p-2 -mr-2"
            aria-label="Close menu"
          >
            <X className="w-7 h-7" />
          </button>
        </div>

        {/* Quick actions — the three real conversion paths.  */}
        <div className="relative px-[var(--space-page-x)] mt-8 grid grid-cols-3 gap-2.5">
          <a
            href={SITE.phone.tel}
            className="haptic flex flex-col items-center gap-2 py-4 rounded-[var(--radius-card-sm)] bg-white/[0.06] border border-white/10 text-white"
            onClick={() => setMobileNav(false)}
          >
            <Phone className="w-5 h-5 text-[var(--color-copper)]" />
            <span className="text-[12px] font-semibold tracking-tight">Call</span>
          </a>
          <a
            href={SITE.phone.sms}
            className="haptic flex flex-col items-center gap-2 py-4 rounded-[var(--radius-card-sm)] bg-white/[0.06] border border-white/10 text-white"
            onClick={() => setMobileNav(false)}
          >
            <MessageSquare className="w-5 h-5 text-[var(--color-copper)]" />
            <span className="text-[12px] font-semibold tracking-tight">Text</span>
          </a>
          <button
            onClick={() => { setMobileNav(false); onEstimate?.(); }}
            className="haptic flex flex-col items-center gap-2 py-4 rounded-[var(--radius-card-sm)] bg-[var(--color-copper)] text-white shadow-lg shadow-[var(--color-copper)]/20"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-[12px] font-semibold tracking-tight">Estimate</span>
          </button>
        </div>

        {/* Navigation list */}
        <nav
          className="relative px-[var(--space-page-x)] mt-10 flex-1"
          aria-label="Primary"
        >
          <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-5">
            Browse
          </div>
          <ul className="divide-y divide-white/10">
            {[{ label: "Home", href: "/" }, ...NAV].map((n) => {
              const active =
                n.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(n.href.replace(/\/$/, ""));
              return (
                <li key={n.label}>
                  <Link
                    to={n.href}
                    className={`haptic flex items-center justify-between py-4 ${
                      active ? "text-[var(--color-copper)]" : "text-white/90 hover:text-white"
                    }`}
                    onClick={() => setMobileNav(false)}
                  >
                    <span className="font-display-bold uppercase tracking-tight text-2xl">
                      {n.label}
                    </span>
                    <ArrowRight className="w-5 h-5 opacity-60" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer NAP */}
        <div className="relative px-[var(--space-page-x)] mt-8 text-white/65 text-[13px] leading-relaxed">
          <div className="text-[var(--color-copper)] text-[10px] tracking-[0.32em] uppercase font-bold mb-3">
            Reach Us
          </div>
          <a href={SITE.phone.tel} className="block text-white text-base font-display-bold uppercase tracking-tight">
            {SITE.phone.display}
          </a>
          <a href={`mailto:${SITE.email}`} className="block hover:text-[var(--color-copper)] mt-1">
            {SITE.email}
          </a>
          <div className="mt-2">
            {SITE.address.locality}, {SITE.address.regionFull} · Mon–Sat 7am–6pm
          </div>
        </div>
      </div>
    </>
  );
}
