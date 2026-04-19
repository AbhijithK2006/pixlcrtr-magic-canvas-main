import { Logo } from "./Logo";

export const Footer = () => {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink py-16 text-white">
      <div className="container flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={48} />
            <span className="font-display text-2xl tracking-tight">Rubic Studio</span>
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            RUBIC STUDIO · est. 2026
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
          © {new Date().getFullYear()} Rubic Studio
        </p>
      </div>

      {/* Wordmark removed per request */}
    </footer>
  );
};
