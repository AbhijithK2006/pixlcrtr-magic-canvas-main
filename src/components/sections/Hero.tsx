import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ParticleField } from "../ParticleField";
import { MagneticButton } from "../MagneticButton";


export const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement) => void } }).__lenis;
    if (lenis) lenis.scrollTo(el); else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={ref}
      data-theme="dark"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-black text-white"
    >
      <ParticleField />



      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 flex flex-col items-center text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="glass mb-8 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-[0.2em] text-white/70"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ice-glow animate-pulse-glow" />
          Pixlcrtr Studio · Open for projects
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="w-full font-display text-[clamp(2.5rem,10vw,9rem)] leading-[0.95] tracking-tight uppercase"
        >
          PIXLCRTR
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-8 max-w-xl text-balance text-base text-white/60 sm:text-lg"
        >
          At Pixlcrtr Studio, we design and build immersive websites, sleek interfaces, and smart digital systems — crafted with pixel-perfect precision and intelligent design.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton variant="primary" onClick={() => scrollTo("projects")}>
            View projects <ArrowRight className="h-4 w-4" />
          </MagneticButton>
        </motion.div>
      </motion.div>



      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-white/50"
      >
        <ArrowDown className="mx-auto mb-2 h-3 w-3" />
        scroll
      </motion.div>
    </section>
  );
};
