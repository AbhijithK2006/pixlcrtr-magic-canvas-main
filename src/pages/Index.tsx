import { useEffect, lazy, Suspense } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

// Lazy load heavy sections
const Projects = lazy(() => import("@/components/sections/Projects").then(m => ({ default: m.Projects })));
const Services = lazy(() => import("@/components/sections/Services").then(m => ({ default: m.Services })));
const AboutUs = lazy(() => import("@/components/sections/AboutUs").then(m => ({ default: m.AboutUs })));
const Contact = lazy(() => import("@/components/sections/Contact").then(m => ({ default: m.Contact })));

const Index = () => {
  useEffect(() => {
    document.title = "Pixlcrtr — Crafting Digital Magic";
    const desc = "Pixlcrtr is a boutique studio engineering immersive websites, interfaces and AI-powered products. Selected work, services and contact.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", desc);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", window.location.href);
  }, []);

  return (
    <div id="top" className="relative flex min-h-screen w-full flex-col">
      <SmoothScroll />
      <CursorGlow />
      <Nav />
      <main className="relative flex-grow">
        <Hero />
        <About />
        <Suspense fallback={<div className="h-96 bg-black" />}>
          <Projects />
          <Services />
          <AboutUs />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
