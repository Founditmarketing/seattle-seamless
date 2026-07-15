import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { SITE } from "../data/site";
import { useDocumentMeta } from "../hooks/useDocumentMeta";

export default function NotFoundPage() {
  /* No canonical/path — a 404 is not an indexable page. */
  useDocumentMeta({
    title: `Page Not Found — ${SITE.name}`,
    description:
      "This page doesn't exist. Head back to Seamless Gutters 4 Less for veteran-owned seamless gutter installation, replacement, guards, and repair in Tacoma and the Puget Sound.",
  });

  return (
    <section className="min-h-[60vh] flex items-center justify-center py-20">
      <div className="text-center px-[var(--space-page-x)]">
        <div className="font-display-black text-[12rem] leading-none text-[var(--color-royal)]/10 select-none">
          404
        </div>
        <h1 className="font-display-black uppercase text-display-sm text-[var(--color-royal)] -mt-16 mb-4">
          Page Not <span className="text-[var(--color-copper)]">Found.</span>
        </h1>
        <p className="text-[var(--color-slate)]/65 text-lg mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="haptic inline-flex items-center gap-2 bg-[var(--color-copper)] hover:bg-[var(--color-copper-deep)] text-white px-7 py-3.5 font-semibold rounded-full transition-all shadow-lg shadow-[var(--color-copper)]/20"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    </section>
  );
}
