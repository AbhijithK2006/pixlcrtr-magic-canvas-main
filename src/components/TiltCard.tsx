import { HTMLAttributes, useRef } from "react";
import { cn } from "@/lib/utils";

interface TiltCardProps extends HTMLAttributes<HTMLDivElement> {
  max?: number;
  glare?: boolean;
}

export const TiltCard = ({ max = 10, glare = true, className, children, ...props }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * max;
    const ry = (x - 0.5) * max;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    if (glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, hsl(var(--ice-glow) / 0.35), transparent 50%)`;
    }
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      data-tilt
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative transition-transform duration-500 ease-out-expo will-change-transform preserve-3d",
        className
      )}
      {...props}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 mix-blend-overlay"
        />
      )}
    </div>
  );
};
