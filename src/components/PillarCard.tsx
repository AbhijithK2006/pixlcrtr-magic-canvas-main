import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { useRef, useState } from "react";

interface PillarCardProps {
  icon: LucideIcon;
  title: string;
  body: string;
  index: number;
}

export const PillarCard = ({ icon: Icon, title, body, index }: PillarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  // Unified Aurora Glow Effect for all cards
  const renderEffect = () => {
    return (
      <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div 
          className="absolute h-64 w-64 rounded-full bg-gradient-ice blur-3xl animate-float"
          style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)', opacity: 0.3 }}
        />
      </div>
    );
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-700 ease-out-expo hover:border-primary/20 hover:shadow-soft"
    >
      {/* Background Effect */}
      {renderEffect()}

      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-center justify-between">
            <div className="relative">
                <Icon className="h-7 w-7 text-primary transition-all duration-500 group-hover:scale-110 group-hover:rotate-3" strokeWidth={1.5} />
                <div className="absolute inset-0 blur-lg bg-primary/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground transition-all duration-700 group-hover:text-primary group-hover:translate-x-1">
                0{index + 1}
            </div>
        </div>
        
        <h3 className="mt-8 font-display text-3xl tracking-tight transition-transform duration-500 group-hover:translate-x-1">{title}</h3>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-foreground/80">{body}</p>
        
        <div className="mt-auto pt-8">
            <div className="h-[1px] w-8 bg-border transition-all duration-700 ease-out-expo group-hover:w-full group-hover:bg-primary/30" />
        </div>
      </div>
    </motion.div>
  );
};
