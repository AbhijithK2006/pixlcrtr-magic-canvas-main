import { ButtonHTMLAttributes, forwardRef, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "outline";
  strength?: number;
}

export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ className, variant = "primary", strength = 0.35, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSpanElement>(null);
    const wrapRef = useRef<HTMLButtonElement>(null);

    const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = wrapRef.current; if (!el) return;
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      if (innerRef.current) innerRef.current.style.transform = `translate(${x * strength * 0.5}px, ${y * strength * 0.5}px)`;
    };
    const onLeave = () => {
      if (wrapRef.current) wrapRef.current.style.transform = "";
      if (innerRef.current) innerRef.current.style.transform = "";
    };

    const variants = {
      primary: "bg-gradient-ice text-primary-foreground",
      ghost: "bg-white/5 text-white border border-white/15 hover:bg-white/10",
      outline: "border border-ink/20 text-ink hover:bg-ink/5",
    };

    return (
      <button
        ref={(node) => {
          wrapRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        data-magnetic
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "group relative inline-flex items-center justify-center rounded-full px-7 py-3.5 text-sm font-medium tracking-wide transition-[transform,box-shadow,background] duration-500 ease-out-expo will-change-transform",
          variants[variant],
          className
        )}
        {...props}
      >
        <span ref={innerRef} className="relative z-10 inline-flex items-center gap-2 transition-transform duration-500 ease-out-expo">
          {children}
        </span>
      </button>
    );
  }
);
MagneticButton.displayName = "MagneticButton";
