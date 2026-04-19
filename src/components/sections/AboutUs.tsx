import { Reveal } from "../Reveal";
import { TextReveal } from "../TextReveal";

const team = [
  { name: "Abhijith", role: "Founder", id: "abhijith", color: "#60A5FA" },
  { name: "Aiman", role: "Founder", id: "aiman", color: "#FBBF24" },
  { name: "Binyamin", role: "Founder", id: "binyamin", color: "#A78BFA" },
  { name: "Raeed", role: "Founder", id: "raeed", color: "#34D399" },
  { name: "Rizwan", role: "Founder", id: "rizwan", color: "#F472B6" },
];

export const AboutUs = () => {
  return (
    <section 
      id="about-us" 
      className="relative bg-black py-32 sm:py-44 text-white" 
      data-theme="dark"
    >
      <div className="container relative z-10">
        <div className="max-w-4xl text-left">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">— Our Story</p>
          </Reveal>
          
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1] tracking-tight text-white">
              About Us
            </h2>
          </Reveal>

          <div className="mt-12 space-y-12">
            <TextReveal 
              as="p"
              text="What started as a small initiative while we were still students has grown into a focused digital studio driven by curiosity, creativity, and a constant desire to build better."
              className="justify-start text-xl md:text-2xl font-bold leading-relaxed text-white"
              delay={0.02}
            />
            
            <TextReveal 
              as="p"
              text="At Pixlcrtr, we don’t just build websites — we craft digital experiences that blend design, performance, and intelligence."
              className="justify-start text-xl md:text-2xl font-normal text-white/80 leading-relaxed"
              delay={0.05}
            />

            <TextReveal 
              as="p"
              text="We began by experimenting, learning, and creating projects — not for clients, but to push our own limits. That mindset still defines us today."
              className="justify-start text-xl md:text-2xl font-normal text-white/80 leading-relaxed"
              delay={0.08}
            />
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-32 text-left">
          <Reveal>
            <h3 className="font-display text-4xl md:text-5xl tracking-tight text-white">Our Team</h3>
          </Reveal>
          <Reveal delay={0.05}>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/30">
              Built by young creators who turned passion into execution
            </p>
          </Reveal>

          <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-16 md:grid-cols-3 lg:grid-cols-5 lg:gap-x-8">
            {team.map((member, i) => (
              <Reveal key={member.id} delay={0.1 + i * 0.05}>
                <div className="group relative flex flex-col items-center">
                  
                  <div className="relative aspect-square w-24 sm:w-36 md:w-40 overflow-hidden rounded-full border border-white/20 bg-white/5 p-1 transition-all duration-700 ease-out-expo group-hover:border-white/60 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]">
                    {/* Inner Glass Layer */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent backdrop-blur-sm" />
                    
                    {/* Placeholder Content — Empty and clean */}
                    <div className="relative h-full w-full overflow-hidden rounded-full">
                       <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />
                    </div>

                    {/* Hover Glow Rim */}
                    <div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100 ring-1 ring-white/30" />
                  </div>

                  <div className="relative mt-8 text-center">
                    <h4 className="font-display text-2xl sm:text-3xl tracking-tight text-white transition-colors duration-500 group-hover:text-white/100">
                      {member.name}
                    </h4>
                    <div className="mt-2 flex flex-col items-center">
                      <span className="h-px w-4 bg-white/20 transition-all duration-500 group-hover:w-12 group-hover:bg-ice-glow" />
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.3em] text-white/40 transition-colors duration-500 group-hover:text-white/60">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-40 max-w-4xl text-left">
          <TextReveal 
            as="p"
            delay={0.1}
            text='"We bring together design thinking and technical precision to create products that are both visually compelling and highly functional."'
            className="justify-start text-2xl md:text-3xl font-display leading-tight text-white/50 italic"
          />
        </div>
      </div>
      
      {/* Decorative noise */}
      <div className="noise pointer-events-none absolute inset-0 opacity-[0.03]" />
    </section>
  );
};
