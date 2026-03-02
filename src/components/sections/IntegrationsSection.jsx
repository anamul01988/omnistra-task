import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { INTEGRATIONS, RANGES } from "../../data/integrationsData";

const BrandIcon = ({ opacity, scale }) => (
  <motion.div
    style={{ opacity, scale }}
    className="w-[450px] h-[450px] max-w-[70vw] max-h-[70vw] bg-[#0145f2] rounded-[56px] flex items-center justify-center shadow-2xl relative"
  >
    <div className="w-full h-full p-4 flex items-center justify-center">
      <svg
        viewBox="0 0 100 100"
        className="w-2/3 h-2/3 text-white fill-current"
      >
        <path d="M25 20 H50 A30 30 0 0 1 50 80 H25 Z" />
        <circle cx="50" cy="50" r="14" className="text-[#0145f2]" />
      </svg>
    </div>
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-[#0145f2] rounded-[56px] -z-10 blur-3xl"
    />
  </motion.div>
);

const LogoCard = ({
  integration,
  progress,
  scale,
  opacity,
  distanceFactor,
}) => {
  const x = useTransform(progress, RANGES.LOGOS_MOVE, [
    integration.x * distanceFactor,
    0,
  ]);
  const y = useTransform(progress, RANGES.LOGOS_MOVE, [
    integration.y * distanceFactor,
    0,
  ]);

  return (
    <motion.div
      style={{ x, y, scale, opacity }}
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <div className="bg-white p-5 md:p-6 rounded-[32px] shadow-xl w-20 h-20 md:w-36 md:h-36 flex items-center justify-center border border-white transition-all transform hover:rotate-6">
        <img
          src={integration.src}
          alt={integration.name}
          className="w-full h-full object-contain"
        />
      </div>
    </motion.div>
  );
};

const IntegrationsSection = () => {
  const containerRef = useRef(null);
  const [distanceFactor, setDistanceFactor] = useState(() => {
    if (typeof window === "undefined") return 1;
    const width = window.innerWidth;
    if (width < 480) return 0.28;
    if (width < 768) return 0.45;
    if (width < 1024) return 0.7;
    return 1;
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 480) setDistanceFactor(0.28);
      else if (width < 768) setDistanceFactor(0.45);
      else if (width < 1024) setDistanceFactor(0.7);
      else setDistanceFactor(1);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 25,
    restDelta: 0.001,
  });

  const textOpacity = useTransform(smoothProgress, RANGES.TEXT, [1, 0]);
  const textScale = useTransform(smoothProgress, RANGES.TEXT, [1, 0.9]);
  const textY = useTransform(smoothProgress, RANGES.TEXT, [0, -30]);

  const logoScale = useTransform(
    smoothProgress,
    RANGES.LOGOS_FADE,
    [1, 0.8, 0],
  );
  const logoOpacity = useTransform(
    smoothProgress,
    RANGES.LOGOS_FADE,
    [1, 1, 0],
  );

  const bgScale = useTransform(smoothProgress, RANGES.BG_SHRINK, [1, 0.12]);
  const bgRadius = useTransform(smoothProgress, RANGES.BG_SHRINK, [0, 60]);
  const bgShadow = useTransform(smoothProgress, RANGES.BG_SHADOW, [
    "0px 0px 0px rgba(0,0,0,0)",
    "0px 40px 80px rgba(0,0,0,0.25)",
  ]);

  const finalOpacity = useTransform(
    smoothProgress,
    RANGES.FINAL_CONTENT,
    [0, 1],
  );
  const finalScale = useTransform(
    smoothProgress,
    RANGES.FINAL_CONTENT,
    [0.5, 1],
  );

  const lineOpacity = useTransform(smoothProgress, RANGES.LINES, [0.4, 0]);

  return (
    <div
      id="integrations-section"
      ref={containerRef}
      className="relative h-[900px] overflow-hidden bg-white"
    >
      <div className="h-full w-full flex items-center justify-center relative">
        <motion.div
          style={{
            scale: bgScale,
            borderRadius: bgRadius,
            boxShadow: bgShadow,
          }}
          className="absolute inset-0 bg-[#eff6ff] z-0 origin-center flex items-center justify-center"
        >
          <BrandIcon opacity={finalOpacity} scale={finalScale} />
        </motion.div>

        <motion.div
          style={{ opacity: lineOpacity }}
          className="absolute inset-0 z-0 pointer-events-none"
        >
          <svg className="w-full h-full">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#cfdfff" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#cfdfff" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {INTEGRATIONS.map((integration) => (
              <line
                key={`line-${integration.id}`}
                x1="50%"
                y1="50%"
                x2={`calc(50% + ${integration.x * distanceFactor}px)`}
                y2={`calc(50% + ${integration.y * distanceFactor}px)`}
                stroke="url(#lineGrad)"
                strokeWidth="1.5"
                strokeDasharray="4 6"
              />
            ))}
          </svg>
        </motion.div>

        <div className="relative z-10 w-full h-full flex items-center justify-center">
          <motion.div
            style={{ opacity: textOpacity, scale: textScale, y: textY }}
            className="text-center px-6 max-w-4xl"
          >
            <h2 className="text-[44px] md:text-[68px] font-bold tracking-tight text-[#08144f] mb-8 leading-[1.05] font-sans">
              One platform, <br />
              <span className="text-[#0145f2]">unlimited integrations</span>
            </h2>
            <button className="bg-[#0145f2] text-white px-9 py-5 rounded-xl font-bold flex items-center gap-3 mx-auto shadow-2xl shadow-blue-500/30 text-lg transition-transform hover:scale-105 active:scale-95">
              View all integrations
              <span className="bg-white/20 p-1.5 rounded-full">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </span>
            </button>
          </motion.div>

          <div className="absolute inset-0 pointer-events-none">
            {INTEGRATIONS.map((integration) => (
              <LogoCard
                key={integration.id}
                integration={integration}
                progress={smoothProgress}
                scale={logoScale}
                opacity={logoOpacity}
                distanceFactor={distanceFactor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsSection;
