import { useEffect } from "react";
import Lenis from "lenis";

export const SmoothScroll = () => {
  useEffect(() => {
    const isMobile = window.innerWidth < 1024 || (navigator.maxTouchPoints > 0);
    const lenis = new Lenis({
      duration: isMobile ? 1.0 : 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1.0,
      touchMultiplier: 1.5,
    });
    let raf = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // expose for anchor links
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    return () => { cancelAnimationFrame(raf); lenis.destroy(); };
  }, []);
  return null;
};
