import { motion, useInView, type HTMLMotionProps } from "framer-motion";
import { ReactNode, useRef } from "react";

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

export const Reveal = ({ children, delay = 0, y = 30, ...props }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1], 
        delay 
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
