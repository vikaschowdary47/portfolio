"use client";
import { motion, useReducedMotion } from "motion/react";

/** Word-by-word reveal as the line scrolls into view. */
export default function Reveal({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <p className={className}>{text}</p>;
  const words = text.split(" ");
  return (
    <p className={className}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block" }}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: i * 0.035, ease: [0.22, 1, 0.3, 1] }}
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </p>
  );
}
