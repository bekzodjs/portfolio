"use client";

import { motion } from "framer-motion";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "li" | "article";
};

const EASE = [0.16, 1, 0.3, 1] as const;

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Reveals a heading line by line, each line rising from behind a mask. */
export function RevealLines({
  lines,
  className,
  delay = 0,
  onView = true,
}: {
  lines: string[];
  className?: string;
  delay?: number;
  onView?: boolean;
}) {
  return (
    <span className={className}>
      {lines.map((line, i) => (
        // The trigger sits on the mask, not the moving text: text shifted out of
        // its clipped parent never counts as "in view".
        <motion.span
          key={line}
          className="block overflow-hidden pb-[0.12em]"
          initial="hidden"
          {...(onView
            ? { whileInView: "shown", viewport: { once: true, margin: "0px 0px -10% 0px" } }
            : { animate: "shown" })}
        >
          <motion.span
            className="block"
            variants={{ hidden: { y: "110%" }, shown: { y: 0 } }}
            transition={{ duration: 1, delay: delay + i * 0.09, ease: EASE }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}
