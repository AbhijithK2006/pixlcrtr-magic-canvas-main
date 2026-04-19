import { Reveal } from "../Reveal";
import { Code2, Palette, Boxes, Brain } from "lucide-react";

const services = [
  { icon: Code2, title: "Website Development", body: "Marketing sites, portfolios and product pages built for speed, SEO and story." },
  { icon: Palette, title: "UI / UX Design", body: "Design systems, interfaces and motion that feel inevitable — not decorated." },
  { icon: Boxes, title: "Custom Web Apps", body: "Full‑stack products with authentication, dashboards and real‑time data." },
  { icon: Brain, title: "AI‑Based Solutions", body: "Embedded LLMs, recommendation engines and intelligent automations." },
];

export const Services = () => {
  return (
    <section data-theme="dark" id="services" className="relative overflow-hidden bg-ink py-32 text-white sm:py-44">
      {/* glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[40vh] w-[80vw] -translate-x-1/2 rounded-full bg-gradient-ice opacity-15 blur-3xl" />

      <div className="container relative">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">— Capabilities</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight">
            What we make.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:mt-20 sm:grid-cols-2 sm:gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-white/20 bg-ink p-7 transition-all duration-700 hover:bg-ink-soft hover:border-white/40 sm:p-10">
                <div className="absolute -right-20 -top-20 h-40 w-40 lg:h-60 lg:w-60 rounded-full bg-gradient-ice opacity-0 lg:blur-3xl blur-2xl transition-opacity duration-700 group-hover:opacity-25" />
                <div className="relative flex items-start justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">0{i + 1}</div>
                  <s.icon className="h-6 w-6 text-ice-glow" strokeWidth={1.4} />
                </div>
                <h3 className="relative mt-8 font-display text-3xl leading-tight transition-transform duration-700 ease-out-expo group-hover:-translate-y-1 sm:mt-12 sm:text-4xl">
                  {s.title}
                </h3>
                <p className="relative mt-3 max-w-md text-sm text-white/60">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* fade to light */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />
    </section>
  );
};
