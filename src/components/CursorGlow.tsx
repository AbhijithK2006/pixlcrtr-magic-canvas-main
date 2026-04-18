import { useEffect, useRef, useState } from "react";

/**
 * Custom cursor that acts as a light source.
 * - Dark sections: bright glow.
 * - Light sections: soft shadow ring.
 * Detects underlying section via data-theme attribute.
 */
export const CursorGlow = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [variant, setVariant] = useState<"dark" | "light">("dark");
  const [hover, setHover] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const mobile = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 1024;
    setIsMobile(mobile);
    if (mobile) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      if (glowRef.current) glowRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
    };

    // Throttle theme detection to keep main thread free
    const themeTick = setInterval(() => {
      const el = document.elementFromPoint(mx, my) as HTMLElement | null;
      if (!el) return;
      
      const themeEl = el.closest("[data-theme]") as HTMLElement | null;
      const t = (themeEl?.dataset.theme as "dark" | "light") || "dark";
      setVariant(t);

      const interactive = el.closest("a, button, [data-magnetic], [data-tilt]");
      setHover(!!interactive);
    }, 150);

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { 
      window.removeEventListener("mousemove", onMove); 
      cancelAnimationFrame(raf); 
      clearInterval(themeTick);
    };
  }, []);

  if (isMobile) return null;

  return (
    <>

      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] rounded-full border transition-[width,height,border-color,background] duration-300 ease-out-expo"
        style={{
          width: hover ? 64 : 32,
          height: hover ? 64 : 32,
          borderColor: variant === "dark" ? "hsl(0 0% 98% / 0.7)" : "hsl(0 0% 8% / 0.5)",
          background: hover ? (variant === "dark" ? "hsl(0 0% 98% / 0.08)" : "hsl(0 0% 8% / 0.04)") : "transparent",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[71] h-1.5 w-1.5 rounded-full mix-blend-difference"
        style={{ background: variant === "dark" ? "hsl(0 0% 98%)" : "hsl(0 0% 98%)" }}
      />
    </>
  );
};
