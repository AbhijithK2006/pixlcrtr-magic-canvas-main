import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight } from "lucide-react";
import { Reveal } from "../Reveal";
import { TiltCard } from "../TiltCard";
import weddingImg from "@/assets/project-wedding.jpg";
import todoImg from "@/assets/project-todo.jpg";
import aibusImg from "@/assets/project-aibus.jpg";

type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  stack: string[];
  github: string;
  live?: string;
  image: string;
  theme: "dark" | "light";
};

const projects: Project[] = [
  {
    id: "wedding",
    title: "Wedding Invite",
    tagline: "Elegant digital invitation experience",
    description:
      "A cinematic, mobile-first wedding invitation site with animated typography, RSVP flow and ambient music. Designed to feel like opening a letter, not a webpage.",
    stack: ["React", "Framer Motion", "Tailwind"],
    github: "https://github.com/AbhijithK2006/wedding-invite",
    live: "https://abdusalam-henna.netlify.app/",
    image: weddingImg,
    theme: "dark",
  },
  {
    id: "todo",
    title: "Todo App",
    tagline: "Productivity-focused task management",
    description:
      "A friction-free task manager with keyboard-first flow, soft micro-interactions and offline persistence. Less ceremony, more done.",
    stack: ["React", "TypeScript", "LocalStorage"],
    github: "https://github.com/AbhijithK2006/todoapp",
    image: todoImg,
    theme: "light",
  },
  {
    id: "aibus",
    title: "AI Bus Allocation",
    tagline: "Smart AI-based bus allocation system",
    description:
      "A data-driven system that allocates buses across routes using demand prediction and optimisation — reducing empty seats and waiting time across a college fleet.",
    stack: ["Python", "ML", "Optimization"],
    github: "https://github.com/AbhijithK2006/Ai-bus-allocation",
    image: aibusImg,
    theme: "dark",
  },
];

export const Projects = () => {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section data-theme="light" id="projects" className="relative bg-background pt-16 pb-32 sm:pt-24 sm:pb-44">
      <div className="container">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">— Selected work</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight">
            Our projects.
          </h2>
        </Reveal>

        <div className="mt-20 grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <div
                onClick={() => setActive(p)}
                className="group block w-full text-left cursor-pointer"
              >
                <TiltCard
                  data-theme={p.theme}
                  className={`relative overflow-hidden rounded-xl sm:rounded-2xl border ${
                    p.theme === "dark"
                      ? "border-white/10 bg-ink text-white"
                      : "border-border bg-card text-foreground"
                  } shadow-card transition-shadow duration-700 hover:shadow-soft`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={p.image}
                      alt={`${p.title} preview`}
                      width={1024}
                      height={640}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-y-0 group-hover:opacity-100" style={{ transform: "translateY(-6px)" }}>
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4" />
                    </div>
                  </div>
                  <div className="p-4 sm:p-7">
                    <div className="flex items-center gap-2 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.2em] opacity-60">
                      0{i + 1} · {p.id === "wedding" ? "Invite" : "App"}
                    </div>
                    <h3 className="mt-2 sm:mt-3 font-display text-xl sm:text-3xl leading-tight line-clamp-1">{p.title}</h3>
                    <p className={`mt-1 sm:mt-2 text-[10px] sm:text-sm line-clamp-1 ${p.theme === "dark" ? "text-white/60" : "text-muted-foreground"}`}>
                      {p.tagline}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5 overflow-hidden">
                      {p.stack.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className={`rounded-full px-2 py-0.5 sm:px-2.5 sm:py-1 font-mono text-[8px] sm:text-[10px] uppercase tracking-wider ${
                            p.theme === "dark" ? "bg-white/10 text-white/70" : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
};

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      data-theme="dark"
      className="fixed inset-0 z-[80] flex items-stretch overflow-y-auto bg-ink/90 backdrop-blur-2xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="container my-auto py-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-ink text-white shadow-glow">
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="h-3 w-3 rounded-full bg-white/20" />
              <span className="ml-3 font-mono text-xs text-white/50">{project.title.toLowerCase().replace(/\s+/g, "-")}</span>
            </div>
            <button
              onClick={onClose}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative aspect-video w-full bg-ink-soft">
            <img
              src={project.image}
              alt={`${project.title} large preview`}
              width={1280}
              height={720}
              className="h-full w-full object-cover opacity-90"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink to-transparent" />
          </div>

          <div className="grid gap-10 p-10 md:grid-cols-3">
            <div className="md:col-span-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ice-glow">Case study</p>
              <h3 className="mt-3 font-display text-5xl leading-tight">{project.title}</h3>
              <p className="mt-4 text-white/70">{project.description}</p>
            </div>
            <div className="space-y-6">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Stack</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {project.stack.map((s) => (
                    <span key={s} className="rounded-full bg-white/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-white/70">{s}</span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
