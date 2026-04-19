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
  const trackOpacity = useTransform(scrollYProgress, [0.18, 0.28], [0, 1]);

  // PHASE 3: Horizontal motion (35%+ scroll). Only after cards are fully visible and stationary for a bit.
  const x = useTransform(scrollYProgress, [0, 0.35, 1], ["0%", "0%", "-75%"]);

  // Progress Bar Sync
  const progressBarScale = useTransform(scrollYProgress, [0.35, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Only start counting progress once the horizontal motion begins
    const p = latest < 0.35 ? 0 : (latest - 0.35) / 0.65;
    const i = Math.min(4, Math.max(1, Math.floor(p * 3.99) + 1));
    setActiveIdx(i);
    setShowHeader(latest < 0.17);
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
        // Map current progress [0.35, 1.0] to [0, 3] index
        const p = currentProgress < 0.35 ? 0 : (currentProgress - 0.35) / 0.65;
        const currentIndex = Math.round(p * 3);
        
        let targetIndex = e.key === "ArrowRight" ? currentIndex + 1 : currentIndex - 1;
        targetIndex = Math.max(0, Math.min(3, targetIndex));
        
        const sectionTop = window.scrollY + rect.top;
        // Map target index back to absolute scroll position
        const targetScroll = sectionTop + (0.35 + (targetIndex / 3) * 0.65) * rect.height;
        
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
      className="relative bg-[#0A0C10] lg:h-[400vh]" 
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
          <div className="lg:hidden grid grid-cols-2 gap-4 pb-24 px-2 sm:px-4 sm:gap-8">
            {/* Mobile Intro Text — Takes full width */}
            <div className="col-span-2 min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
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
                className="flex items-center"
                initial={{ opacity: 0, y: 40, scale: 0.95, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ 
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1],
                  delay: (i % 2) * 0.1
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
              className="flex h-full w-[400%]"
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
              <span className="text-white">0{activeIdx}</span> / 04
            </div>
            <div className="relative h-px w-32 overflow-hidden bg-white/10 sm:w-64">
              <motion.div 
                style={{ scaleX: progressBarScale, originX: 0 }}
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
