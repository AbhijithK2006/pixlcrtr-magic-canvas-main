import { useEffect, useState } from "react";

const links = [
  { id: "about", label: "Studio" },
  { id: "projects", label: "Work" },
  { id: "services", label: "Services" },
  { id: "about-us", label: "About Us" },
  { id: "contact", label: "Contact" },
];

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      // detect underlying section
      const el = document.elementFromPoint(window.innerWidth / 2, 60) as HTMLElement | null;
      const t = (el?.closest("[data-theme]") as HTMLElement | null)?.dataset.theme as "dark" | "light" | undefined;
      if (t) setTheme(t);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el); else el.scrollIntoView({ behavior: "smooth" });
  };

  const dark = theme === "dark";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-out-expo ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="container">
        <div
          className={`flex items-center justify-between rounded-full border px-5 py-3 transition-all duration-700 ease-out-expo ${
            scrolled
              ? dark
                ? "border-white/10 bg-ink/60 backdrop-blur-xl"
                : "border-white/20 bg-black/80 backdrop-blur-xl shadow-card"
              : "border-transparent bg-transparent"
          }`}
        >
          <button onClick={() => scrollTo("top")} className="flex items-center gap-2">
            <span className={`inline-block h-2.5 w-2.5 rounded-full bg-gradient-ice ${scrolled ? "" : "animate-pulse-glow"}`} />
            <span className={`font-display text-xl tracking-tight ${dark || scrolled ? "text-white" : "text-foreground"}`}>
              Pixlcrtr
            </span>
          </button>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${
                  dark || scrolled ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
};
