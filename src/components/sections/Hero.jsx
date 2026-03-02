import { Fragment } from "react";
import { motion } from "framer-motion";

const stats = [
  { num: "$2B+", lbl: "Recovered Revenue" },
  { num: "95%", lbl: "Win Rate" },
  { num: "4×", lbl: "ROI Guarantee" },
];

export default function Hero() {
  return (
    <main
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden pt-[calc(72px+60px)] pb-[80px] hero-gradient-bg"
      id="pageHero"
    >
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-30 left-[-150px] top-[20%] blur-[100px] hero-glow-blue" />
      <div className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 opacity-30 right-[-150px] top-[30%] blur-[100px] hero-glow-green" />

      <div className="relative z-10 text-center max-w-[720px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-white/10 bg-white/5 text-[12.5px] font-medium text-[#c3f967] tracking-[0.02em]"
        >
          <span className="w-[7px] h-[7px] rounded-full bg-[#c3f967] flex-shrink-0 animate-pulse-dot" />
          Trusted by 3,000+ merchants worldwide
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
          className="font-bold text-white leading-[1.1] tracking-[-0.04em] mb-6 hero-title-clamp font-sans"
        >
          Stop chargebacks.
          <br />
          <span className="bg-gradient-to-br from-[#3d7fff] to-[#7bb4ff] bg-clip-text text-transparent">
            Recover revenue.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
          className="text-[#97a3b6] leading-[1.7] mb-10 mx-auto max-w-[560px] hero-p-clamp"
        >
          Omnistra's AI‑powered platform automates chargeback management so you
          can focus on growing your business, not fighting disputes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center justify-center gap-3 flex-wrap mb-14"
        >
          <a
            href="#"
            className="btn-premium btn-premium--primary px-8 py-4 text-[15px] rounded-xl overflow-hidden font-bold"
          >
            Get Started Free
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-[#97a3b6] text-[15px] font-bold hover:bg-white/5 hover:text-white transition-all"
          >
            Schedule a Demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className="flex items-center justify-center gap-8 flex-wrap"
        >
          {stats.map((s, i) => (
            <Fragment key={s.num}>
              {i > 0 && <div className="w-px h-10 bg-white/10" />}
              <div className="flex flex-col items-center gap-1">
                <span className="font-bold text-white tracking-tight hero-stat-num font-sans">
                  {s.num}
                </span>
                <span className="text-[12px] text-[#677489] font-bold tracking-widest uppercase">
                  {s.lbl}
                </span>
              </div>
            </Fragment>
          ))}
        </motion.div>
      </div>
    </main>
  );
}
