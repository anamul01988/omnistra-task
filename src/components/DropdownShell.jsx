import { motion, AnimatePresence } from "framer-motion";

export function DropdownShell({ isOpen, children, className = "", isLight }) {
  const themeClasses = isLight
    ? "bg-white border border-black/5 shadow-[0_2.5rem_6.25rem_rgba(0,0,0,0.1)]"
    : "bg-[rgba(10,10,10,0.95)] shadow-[0_2.5rem_6.25rem_rgba(0,0,0,0.8)]";

  return (
    <AnimatePresence prefetch={false}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: "-1rem" }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: "-1rem" }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          className={`fixed top-[2rem] left-1/2 -translate-x-1/2 z-[1001] mt-[0.5rem]
                     backdrop-blur-2xl rounded-[1.5rem] ${themeClasses} ${className}`}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
