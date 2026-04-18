import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export const TextReveal = ({ text, className, delay = 0, once = true }: TextRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-5% 0px" });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const word = {
    hidden: {
      opacity: 0,
      y: 24,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.h2
      ref={ref}
      className={cn("flex flex-wrap justify-center", className)}
      variants={container}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="mr-[0.3em] inline-block will-change-[transform,filter,opacity]"
        >
          {w}
        </motion.span>
      ))}
    </motion.h2>
  );
};
