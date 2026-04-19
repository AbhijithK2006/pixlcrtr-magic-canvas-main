import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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
  const [isOpen, setIsOpen] = useState(false);

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
          <button onClick={() => { scrollTo("top"); setIsOpen(false); }} className="group flex items-center gap-3 shrink-0">
            <Logo
              size={scrolled ? 30 : 36}
              className="transition-all duration-700 ease-out-expo group-hover:scale-110"
            />
            <span className={`font-display text-lg tracking-tight transition-colors duration-700 sm:text-xl ${dark || scrolled ? "text-white" : "text-foreground"}`}>
              Rubic Studio
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

          <button
            className={`flex h-10 w-10 items-center justify-center rounded-full md:hidden ${
              dark || scrolled ? "text-white hover:bg-white/10" : "text-foreground hover:bg-black/5"
            }`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full mt-4 px-4 md:hidden"
          >
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink/95 p-4 backdrop-blur-2xl">
              <div className="flex flex-col gap-2">
                {links.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => {
                      scrollTo(l.id);
                      setIsOpen(false);
                    }}
                    className="flex w-full items-center px-4 py-4 font-mono text-xs uppercase tracking-[0.3em] text-white/70 hover:text-white hover:bg-white/5 active:bg-white/10 rounded-xl transition-all"
                  >
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>

  );
};
