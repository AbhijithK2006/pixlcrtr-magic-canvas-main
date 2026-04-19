import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export const TextReveal = ({ text, className, delay = 0, once = true, as: Tag = "h2" }: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-5% 0px" });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      ref={ref}
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="mr-[0.3em] inline-block will-change-[transform,filter,opacity]"
        >
          {w}
        </motion.span>
      ))}
    </MotionTag>
  );
};
