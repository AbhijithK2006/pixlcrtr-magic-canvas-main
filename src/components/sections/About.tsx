import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Reveal } from "../Reveal";
import { Sparkles, Zap, Layers, Brain, Compass, Aperture } from "lucide-react";
import { AboutCard } from "./AboutCard";
import { TextReveal } from "../TextReveal";

// Assets
import creativityImg from "@/assets/about/creativity.png";
import performanceImg from "@/assets/about/performance.png";
import innovationImg from "@/assets/about/innovation.png";
import intelligenceImg from "@/assets/about/intelligence.png";
import precisionImg from "@/assets/about/precision.png";
import eleganceImg from "@/assets/about/elegance.png";

const pillars = [
  { 
    id: "creativity",
    icon: Sparkles, 
    title: "Creativity", 
    body: "Distinct, cinematic interfaces engineered around your story — never templated.",
    image: creativityImg,
    accent: "#A78BFA"
  },
  { 
    id: "performance",
    icon: Zap, 
    title: "Performance", 
    body: "60fps animation, sub‑second loads, accessible by default. Magic without the lag.",
    image: performanceImg,
    accent: "#34D399"
  },
  { 
    id: "innovation",
    icon: Layers, 
    title: "Innovation", 
    body: "AI, motion, and immersive 3D woven into products that feel one step ahead.",
    image: innovationImg,
    accent: "#60A5FA"
  },
  { 
    id: "intelligence",
    icon: Brain, 
    title: "Intelligence", 
    body: "Self-learning interfaces and predictive UX that anticipates user needs.",
    image: intelligenceImg,
    accent: "#3B82F6"
  },
  { 
    id: "precision",
    icon: Compass, 
    title: "Precision", 
    body: "Mathematical rigor applied to every pixel, transition, and line of code.",
    image: precisionImg,
    accent: "#22D3EE"
  },
  { 
    id: "elegance",
    icon: Aperture, 
    title: "Elegance", 
    body: "Minimalist sophistication where every detail serves a purpose.",
    image: eleganceImg,
    accent: "#F59E0B"
  },
];

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1);
  const [showHeader, setShowHeader] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // PHASE 1: Text (0% – 12% scroll). Fully visible, then fades out.
  const headerOpacity = useTransform(scrollYProgress, [0, 0.08, 0.14], [1, 1, 0]);
  const headerYOffset = useTransform(scrollYProgress, [0.08, 0.14], [0, -60]);
  const headerScale = useTransform(scrollYProgress, [0.08, 0.14], [1, 0.9]);

  // PHASE 2: Cards (18%+ scroll). Only appear AFTER text is fully gone.
  const trackOpacity = useTransform(scrollYProgress, [0.16, 0.22], [0, 1]);

  // PHASE 3: Horizontal motion (22%+ scroll). Only after cards are fully visible.
  const x = useTransform(scrollYProgress, [0, 0.22, 1], ["0%", "0%", "-83.333%"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const i = Math.min(6, Math.max(1, Math.floor(latest * 6.01) + 1));
    setActiveIdx(i);
    setShowHeader(latest < 0.15);
  });

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= 100;
      if (!inView) return;

      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const currentProgress = scrollYProgress.get();
        const currentIndex = Math.round(currentProgress * 6);
        let targetIndex = e.key === "ArrowRight" ? currentIndex + 1 : currentIndex - 1;
        targetIndex = Math.max(0, Math.min(5, targetIndex));
        
        const sectionTop = window.scrollY + rect.top;
        const targetScroll = sectionTop + (targetIndex / 6) * rect.height;
        
        const lenis = (window as unknown as { __lenis?: { scrollTo: (t: number) => void } }).__lenis;
        if (lenis) {
          lenis.scrollTo(targetScroll);
        } else {
          window.scrollTo({ top: targetScroll, behavior: "smooth" });
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [scrollYProgress]);

  return (
    <section 
      ref={containerRef} 
      id="about" 
      className="relative bg-[#0A0C10] lg:h-[600vh]" 
      data-theme="dark"
    >
      <div className="lg:sticky lg:top-0 min-h-screen w-full lg:overflow-hidden flex flex-col">
        {/* Header — Desktop only (mobile has its own below) */}
        {showHeader && (
        <motion.div 
          style={{ opacity: headerOpacity, y: headerYOffset, scale: headerScale }}
          className="hidden lg:absolute lg:inset-0 lg:flex lg:flex-col lg:items-center lg:justify-center lg:z-30 lg:pointer-events-none lg:text-center px-6"
        >
          {/* Eyebrow */}
          <Reveal>
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-8 bg-white/20" />
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">The Studio</p>
              <span className="h-px w-8 bg-white/20" />
            </div>
          </Reveal>

          {/* Headline — staggered word reveal */}
          <div className="max-w-5xl mx-auto">
            <TextReveal 
              text="We craft high-performance, visually striking websites that blend precision, speed, and seamless user experience into every pixel."
              className="font-display text-[clamp(1.8rem,4.5vw,3.8rem)] md:text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.12] tracking-tight text-white"
              delay={0.3}
            />
          </div>

          {/* Decorative line */}
          <Reveal delay={1.8}>
            <div className="mt-10 h-px w-16 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </Reveal>
        </motion.div>
        )}

        {/* Responsive Content */}
        <div className="flex-grow">
          {/* Mobile Layout: Vertical Scroll with Animated Cards */}
          <div className="lg:hidden flex flex-col gap-8 pb-24 px-4">
            {/* Mobile Intro Text */}
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
              <Reveal>
                <div className="flex items-center justify-center gap-3 mb-6">
                  <span className="h-px w-6 bg-white/20" />
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-white/40">The Studio</p>
                  <span className="h-px w-6 bg-white/20" />
                </div>
              </Reveal>
              <TextReveal 
                text="We craft high-performance, visually striking websites that blend precision, speed, and seamless user experience into every pixel."
                className="font-display text-[clamp(1.5rem,6vw,2.5rem)] leading-[1.15] tracking-tight text-white"
                delay={0.2}
              />
              <Reveal delay={1.5}>
                <div className="mt-8 h-px w-12 mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              </Reveal>
            </div>

            {pillars.map((p, i) => (
              <motion.div 
                key={p.id + "-mobile"} 
                className="min-h-[75vh] flex items-center"
                initial={{ opacity: 0, y: 60, scale: 0.95, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.1
                }}
              >
                <AboutCard {...p} index={i} />
              </motion.div>
            ))}
          </div>

          {/* Desktop Layout: Horizontal Track */}
          <div className="hidden lg:block h-screen overflow-hidden">
            <motion.div 
              style={{ x, opacity: trackOpacity }} 
              className="flex h-full w-[600%]"
            >
              {pillars.map((p, i) => (
                <AboutCard key={p.id} {...p} index={i} />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Progress UI (Desktop Only) */}
        <div className="hidden lg:block absolute bottom-12 left-0 z-30 w-full px-12">
          <div className="container mx-auto flex items-end justify-between">
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
              <span className="text-white">0{activeIdx}</span> / 06
            </div>
            <div className="relative h-px w-32 overflow-hidden bg-white/10 sm:w-64">
              <motion.div 
                style={{ scaleX: scrollYProgress, originX: 0 }}
                className="absolute inset-0 bg-ice-glow"
              />
            </div>
            <div className="hidden font-mono text-[10px] uppercase tracking-[0.4em] text-white/20 sm:block">
              Scroll to explore
            </div>
          </div>
        </div>

        {/* Backdrop Noise */}
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.05]" />
      </div>
    </section>
  );
};
