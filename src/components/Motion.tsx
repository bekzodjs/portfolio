"use client";

import { MotionConfig } from "framer-motion";

/** Honors the visitor's "reduce motion" system setting for every animation. */
export function Motion({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
