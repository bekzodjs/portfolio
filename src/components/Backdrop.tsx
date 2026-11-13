"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const CUBES = [
  { size: 74, top: "13%", left: "4%", speed: 30, blur: 0 },
  { size: 34, top: "9%", left: "46%", speed: 20, blur: 1 },
  { size: 52, top: "20%", left: "93%", speed: 24, blur: 0 },
  { size: 26, top: "44%", left: "1.5%", speed: 18, blur: 2 },
  { size: 44, top: "58%", left: "95%", speed: 34, blur: 1 },
  { size: 90, top: "78%", left: "7%", speed: 40, blur: 3 },
  { size: 30, top: "86%", left: "62%", speed: 22, blur: 0 },
  { size: 22, top: "34%", left: "71%", speed: 16, blur: 2 },
];

/** Fixed scene behind the page: teal light, a faint grid and drifting glass cubes. */
export function Backdrop() {
  const { scrollYProgress } = useScroll();
  const near = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const far = useTransform(scrollYProgress, [0, 1], ["0%", "-7%"]);

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_18%,rgb(26_163_196/0.30),transparent_70%),radial-gradient(45%_40%_at_12%_70%,rgb(53_224_210/0.16),transparent_70%),radial-gradient(50%_45%_at_85%_95%,rgb(26_163_196/0.18),transparent_70%)]" />
      <motion.div
        className="absolute inset-[-10%] opacity-[0.22] [background-image:linear-gradient(rgb(150_240_255/0.22)_1px,transparent_1px),linear-gradient(90deg,rgb(150_240_255/0.22)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(70%_60%_at_50%_35%,#000,transparent)]"
        style={{ y: far }}
      />
      <motion.div className="absolute inset-0 h-[130%]" style={{ y: near }}>
        {CUBES.map((c, i) => (
          <div
            key={i}
            className={`cube-wrap ${i > 4 ? "hidden sm:block" : ""}`}
            style={{
              top: c.top,
              left: c.left,
              animationDelay: `${-i * 1.7}s`,
              filter: c.blur ? `blur(${c.blur}px)` : undefined,
            }}
          >
            <div
              className="cube"
              style={
                {
                  "--s": `${c.size}px`,
                  animationDuration: `${c.speed}s`,
                } as React.CSSProperties
              }
            >
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
