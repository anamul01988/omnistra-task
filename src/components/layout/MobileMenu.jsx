import { motion, AnimatePresence } from "framer-motion";
import { productItems, simpleMenus } from "../../data/navData";
import Logo from "../ui/Logo";
import { ArrowIcon } from "../ui/ArrowIcon";
import { NavTag } from "../ui/NavTag";
import { useState } from "react";

function MobileSeparator() {
  return (
    <div className="flex items-center w-full px-[1rem] my-[0.5rem] opacity-20">
      <div className="w-[0.375rem] h-[0.375rem] rotate-45 bg-white flex-shrink-0" />
      <div className="flex-1 border-t border-dashed border-white mx-[0.25rem]" />
      <div className="w-[0.375rem] h-[0.375rem] rotate-45 bg-white flex-shrink-0" />
    </div>
  );
}

function MobileSection({ label, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between px-[1rem] py-[0.75rem] text-[12px] font-bold text-white uppercase tracking-[0.05em] font-sans"
      >
        <span>{label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="opacity-40 w-[12px] h-[12px] flex items-center justify-center"
        >
          <ArrowIcon />
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-white/[0.02]"
          >
            <div className="flex flex-col pb-[1rem] px-[1rem] gap-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MobileMenu({ isOpen, setOpen }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: "-1rem" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-1rem" }}
          className="fixed inset-0 z-[2000] overflow-y-auto bg-black flex flex-col pt-[1.5rem] px-[1.5rem] mobile-menu-glass"
        >
          <div className="flex items-center justify-between mb-[2rem]">
            <Logo isHeaderHovered={true} />
            <button
              onClick={() => setOpen(false)}
              className="w-[2.5rem] h-[2.5rem] rounded-full bg-white/5 flex items-center justify-center text-white"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <div className="flex gap-[1rem] mb-[1.5rem]">
            <a
              href="#"
              className="btn-premium btn-premium--compact flex-1 group"
            >
              <span>Sign In</span>
              <span className="w-[12px] h-[12px] opacity-60">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#"
              className="btn-premium btn-premium--primary btn-premium--compact flex-1 group"
            >
              <span>Sign Up</span>
              <span className="w-[12px] h-[12px] opacity-60">
                <ArrowIcon />
              </span>
            </a>
          </div>

          <MobileSeparator />

          <div className="flex flex-col">
            <MobileSection label="Product">
              <div className="flex flex-col gap-2">
                {productItems.map((item) => (
                  <a
                    key={item.id}
                    href={`/products/${item.id}`}
                    className="nav-card min-h-[8.5rem] p-[1.25rem]"
                  >
                    <img
                      src={item.imgUrl}
                      className="nav-card__img absolute right-[-5rem] h-full object-cover"
                      alt=""
                    />
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="nav-card__title !mb-0">{item.title}</h4>
                      <NavTag tag={item.tag} />
                    </div>
                    <p className="nav-card__desc max-w-[70%]">{item.desc}</p>
                  </a>
                ))}
              </div>
            </MobileSection>
            <MobileSeparator />

            {simpleMenus.map((menu) => (
              <div key={menu.id}>
                <MobileSection label={menu.label}>
                  {menu.links.map((link) => (
                    <a
                      key={link}
                      href="#"
                      className="text-[#97a3b6] hover:text-white uppercase tracking-wider font-semibold text-[12px] py-2 px-2 transition-colors font-sans"
                    >
                      {link}
                    </a>
                  ))}
                </MobileSection>
                <MobileSeparator />
              </div>
            ))}

            <a
              href="#"
              className="flex justify-between items-center px-[1rem] py-[0.75rem] text-[0.875rem] font-bold text-white uppercase tracking-widest group"
            >
              <span>Pricing</span>
              <span className="opacity-40 w-[12px] h-[12px] flex items-center justify-center">
                <ArrowIcon />
              </span>
            </a>
            <MobileSeparator />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
