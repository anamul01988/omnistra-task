import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import Logo from "../ui/Logo";
import ProductDropdown from "../dropdowns/ProductDropdown";
import SimpleDropdown from "../dropdowns/SimpleDropdown";
import MobileMenu from "./MobileMenu";
import { ArrowIcon } from "../ui/ArrowIcon";
import { simpleMenus } from "../../data/navData";

const menuConfig = [
  { id: "product", label: "Product", type: "dropdown" },
  { id: "customers", label: "Customers", type: "simple" },
  { id: "pricing", label: "Pricing", type: "link", href: "#" },
  { id: "integrations", label: "Integrations", type: "simple" },
  { id: "resources", label: "Resources", type: "simple" },
  { id: "company", label: "Company", type: "simple" },
];

function NavButton({ label, onClick, isActive, isLink, href, isLight }) {
  const baseStyles =
    "inline-flex items-center gap-[0.375rem] p-[0.625em] rounded-full text-[12px] font-medium uppercase transition-all duration-300 whitespace-nowrap relative font-sans";

  const activeStyles = isLight
    ? isActive
      ? "text-[#0145f2]"
      : "text-[#08144f]/60 hover:text-[#08144f]"
    : isActive
      ? "text-white"
      : "text-[#ffffff] hover:text-white";

  const Element = isLink ? "a" : "button";
  const behavior = isLink ? { href } : { onClick };

  return (
    <Element {...behavior} className={`${baseStyles} ${activeStyles}`}>
      {label}
    </Element>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const closeTimer = useRef(null);

  const isPill = scrolled || hovered;

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      const integrations = document.getElementById("integrations-section");
      if (integrations) {
        const rect = integrations.getBoundingClientRect();
        // Light mode if section is within top half of viewport
        setIsLight(rect.top < 100 && rect.bottom > 100);
      } else {
        setIsLight(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (!e.target.closest("[data-nav-item]")) setOpenMenu(null);
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const handleMenuEnter = useCallback((id) => {
    clearTimeout(closeTimer.current);
    setOpenMenu(id);
  }, []);

  const handleMenuLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  }, []);

  const handleMenuClick = useCallback((id) => {
    setOpenMenu((prev) => (prev === id ? null : id));
  }, []);

  const containerClasses = `navbar-container ${isPill ? "navbar-container--pill" : ""} ${isLight ? "navbar-container--light" : ""}`;

  const navInnerBg = isLight ? "bg-black/5" : "bg-white/10";
  const navInnerBorder = isLight ? "border-black/5" : "border-white/10";
  const burgerColor = isLight ? "bg-[#08144f]" : "bg-white";

  return (
    <>
      <header
        className={`fixed left-0 right-0 z-[1000] flex items-center justify-center px-[1.5rem] h-[4.5rem] transition-all duration-700 ${isPill ? "top-[0rem]" : "top-[0.5rem]"}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`flex items-center justify-between w-full h-[4rem] navbar-pill transition-colors duration-500 ${containerClasses}`}
        >
          <Logo isHeaderHovered={isPill || isLight} forceDark={isLight} />

          <nav
            className={`hidden md:flex flex-1 justify-center absolute left-1/2 -translate-x-1/2 ${!isPill ? `${navInnerBg} border ${navInnerBorder}` : ""} px-[0.625em] rounded-full transition-colors duration-500`}
          >
            {menuConfig.map((item) => (
              <div
                key={item.id}
                data-nav-item
                className="relative"
                onMouseEnter={
                  item.type !== "link"
                    ? () => handleMenuEnter(item.id)
                    : undefined
                }
                onMouseLeave={
                  item.type !== "link" ? handleMenuLeave : undefined
                }
              >
                <NavButton
                  label={item.label}
                  onClick={() => handleMenuClick(item.id)}
                  isActive={openMenu === item.id}
                  isLink={item.type === "link"}
                  href={item.href}
                  isLight={isLight}
                />
                {item.type === "dropdown" && (
                  <ProductDropdown
                    isOpen={openMenu === item.id}
                    isLight={isLight}
                  />
                )}
                {item.type === "simple" && (
                  <SimpleDropdown
                    isOpen={openMenu === item.id}
                    isLight={isLight}
                    links={
                      simpleMenus.find((m) => m.id === item.id)?.links || []
                    }
                  />
                )}
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-[1rem] ml-auto">
            <a
              href="#"
              className={`btn-premium btn-premium--compact group text-[12px] ${isLight ? "text-[#08144f] border-[#08144f]/10" : ""}`}
            >
              <span>Sign In</span>
              <span className="w-[12px] h-[12px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </a>
            <a
              href="#"
              className="btn-premium btn-premium--primary btn-premium--compact group font-black text-[12px]"
            >
              <span>{isPill ? "SCHEDULE A DEMO" : "Sign Up"}</span>
              <span className="w-[12px] h-[12px] opacity-60 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowIcon />
              </span>
            </a>
          </div>

          <button
            className={`md:hidden flex flex-col gap-[5px] p-[10px] items-center justify-center ${isLight ? "hover:bg-black/5" : "hover:bg-white/10"} rounded-full`}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  mobileOpen
                    ? i === 1
                      ? { opacity: 0 }
                      : i === 0
                        ? { rotate: 45, y: 7 }
                        : { rotate: -45, y: -7 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className={`block w-5 h-[2px] ${burgerColor} rounded-full origin-center`}
              />
            ))}
          </button>
        </div>
      </header>
      <MobileMenu isOpen={mobileOpen} setOpen={setMobileOpen} />
    </>
  );
}
