import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface AboutCardProps {
  id: string;
  title: string;
  body: string;
  icon: LucideIcon;
  image: string;
  index: number;
  accent: string;
}

export const AboutCard = ({ title, body, icon: Icon, image, index, accent }: AboutCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Simple Entrance
  const scale = 1;
  const opacity = 1;

  // DNA Stagger — desktop only
  const isEven = index % 2 === 0;
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;
  const yOffset = isDesktop ? (isEven ? -60 : 60) : 0;
  const cardRotate = isDesktop ? (isEven ? -2 : 2) : 0;

  // Scale and opacity based on horizontal entrance (this will be refined in About.tsx)
  // For now, focusing on the internal contents

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -8;
    const rotateY = (x - 0.5) * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    
    // Smooth glow follow
    const glow = cardRef.current.querySelector('.card-glow') as HTMLElement;
    if (glow) {
      glow.style.left = `${x * 100}%`;
      glow.style.top = `${y * 100}%`;
      glow.style.opacity = '1';
    }
  };

  const onMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    const glow = cardRef.current.querySelector('.card-glow') as HTMLElement;
    if (glow) glow.style.opacity = '0';
  };

  return (
    <div className="relative flex h-full w-full lg:w-screen shrink-0 items-center justify-center lg:px-32">
      <motion.div
        ref={cardRef}
        data-tilt
        style={{ scale, opacity, y: yOffset, rotate: cardRotate }}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "group relative h-[45vh] sm:h-[70vh] w-full max-w-5xl overflow-hidden rounded-2xl sm:rounded-3xl border border-white/30 bg-[#141620] shadow-xl lg:shadow-[0_8px_60px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out-expo will-change-transform perspective-1000",
          "lg:transition-[transform,border-color]"
        )}
      >
        {/* Background Image Parallax */}
        <div className="absolute inset-0 z-0">
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover opacity-100 transition-transform duration-700 ease-out-expo group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        </div>

        {/* Massive Watermark Number */}
        <div className="pointer-events-none absolute -bottom-10 -right-10 z-0 select-none overflow-hidden">
          <span className="font-mono text-[clamp(120px,18vw,280px)] font-bold uppercase leading-none text-white/[0.08] outline-text">
            0{index + 1}
          </span>
        </div>

        {/* Glow Effect */}
        <div className="card-glow pointer-events-none absolute h-64 w-64 lg:h-96 lg:w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-[60px] lg:blur-[100px] transition-opacity duration-500" style={{ background: accent + '40' }} />

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-16">
          <div 
            className="mb-4 sm:mb-6 flex h-10 w-10 sm:h-14 sm:w-14 items-center justify-center rounded-xl sm:rounded-2xl border border-white/20 bg-white/10 lg:backdrop-blur-md"
            style={{ color: accent }}
          >
            <Icon className="h-6 w-6" strokeWidth={1.5} />
          </div>

          <div>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em] text-white/60">
              <span className="h-px w-8 bg-white/30" />
              Pillar 0{index + 1}
            </div>
            <h3 className="mt-2 sm:mt-4 font-display text-2xl leading-[1] text-white sm:text-7xl">
              {title}
            </h3>
          </div>

          <p className="mt-3 sm:mt-6 max-w-lg text-[10px] sm:text-base leading-relaxed text-white line-clamp-2 sm:line-clamp-none">
            {body}
          </p>
        </div>

        {/* 1px Hairline Border Overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-white/10" />
        
        {/* Subtle Noise */}
        <div className="noise pointer-events-none absolute inset-0 opacity-[0.03]" />
      </motion.div>
    </div>
  );
};
