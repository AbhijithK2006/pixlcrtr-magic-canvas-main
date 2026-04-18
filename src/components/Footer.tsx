export const Footer = () => {
  return (
    <footer data-theme="dark" className="relative overflow-hidden bg-ink py-16 text-white">
      <div className="container flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-ice" />
            <span className="font-display text-2xl tracking-tight">Pixlcrtr</span>
          </div>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
            PIXLCRTR · est. 2024
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/40">
          © {new Date().getFullYear()} Pixlcrtr Studio
        </p>
      </div>

      {/* Wordmark removed per request */}
    </footer>
  );
};
