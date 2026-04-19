import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Three.js particle field — ice-blue points reacting to cursor.
 * Lightweight: 1500 points, no postprocessing.
 */
export const ParticleField = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 60;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(w, h);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const isMobile = window.innerWidth < 1024 || (('ontouchstart' in window) || (navigator.maxTouchPoints > 0));
    const COUNT = isMobile ? 500 : 1500;
    const positions = new Float32Array(COUNT * 3);
    const speeds = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 250; // width
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150; // height
      positions[i * 3 + 2] = (Math.random() - 0.5) * 250; // depth
      speeds[i] = 0.2 + Math.random() * 0.6;
    }

    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create circular sprite texture for soft particles
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const ctx = c.getContext("2d")!;
    const grd = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,255,255,1)");
    grd.addColorStop(0.4, "rgba(200,200,200,0.6)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 64, 64);
    const sprite = new THREE.CanvasTexture(c);

    const mat = new THREE.PointsMaterial({
      size: isMobile ? 1.0 : 0.7,
      map: sprite,
      transparent: true,
      depthWrite: false, 
      blending: THREE.AdditiveBlending,
      color: 0xffffff,
    });
    const points = new THREE.Points(geom, mat);
    scene.add(points);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    let isVisible = true;

    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !raf) {
        raf = requestAnimationFrame(tick);
      }
    }, { threshold: 0 });
    obs.observe(container);

    const posArray = geom.attributes.position.array as Float32Array;
    const start = performance.now();
    const tick = () => {
      if (!isVisible) {
        raf = 0;
        return;
      }
      const t = (performance.now() - start) * 0.0001;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;

      points.rotation.y = t * 0.6 + mouse.x * 0.3;
      points.rotation.x = -mouse.y * 0.2;

      // Direct array manipulation is faster than setZ
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3 + 2;
        posArray[i3] += speeds[i] * 0.05;
        if (posArray[i3] > 125) posArray[i3] = -125;
      }
      geom.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onResize = () => {
      const W = container.clientWidth, H = container.clientHeight;
      camera.aspect = W / H; camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    return () => {
      obs.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geom.dispose();
      mat.dispose();
      sprite.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 -z-0" aria-hidden />;
};
