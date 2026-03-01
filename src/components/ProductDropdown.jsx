import { motion } from "framer-motion";
import { productItems } from "../data/navData";
import { NavTag } from "./NavTag";
import { DropdownShell } from "./DropdownShell";

function ProductCard({ item, isLight }) {
  const textColor = isLight ? "text-[#08144f]" : "text-white";
  const descColor = isLight ? "text-[#08144f]/60" : "text-[#97a3b6]";
  const cardBg = isLight ? "hover:bg-black/5" : "hover:bg-white/5";

  return (
    <motion.a
      href={`/products/${item.id}`}
      transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      className={`c-nav-card min-w-0 h-[19.625em] group !shadow-none ${cardBg}`}
    >
      <img
        src={item.imgUrl}
        alt=""
        className="c-nav-card__img absolute bottom-[-2.5rem] left-0 w-full h-[18.75rem] object-cover"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center 70%, black 10%, transparent 85%)",
          maskImage:
            "radial-gradient(circle at center 70%, black 10%, transparent 85%)",
        }}
      />
      <div className="relative z-10 w-full">
        <div className="flex items-center gap-[0.5rem] mb-[1rem]">
          <h3
            className={`font-bold text-[0.875rem] tracking-tight ${textColor} mb-0`}
          >
            {item.title}
          </h3>
          <NavTag tag={item.tag} />
        </div>
        <p
          className={`text-[0.8125rem] leading-[1.6] ${descColor} max-w-full italic font-medium`}
        >
          {item.desc}
        </p>
      </div>
    </motion.a>
  );
}

export default function ProductDropdown({ isOpen, isLight }) {
  return (
    <DropdownShell
      isOpen={isOpen}
      isLight={isLight}
      className="grid grid-cols-5 gap-[0.75rem] w-[81rem] p-[0.75rem]"
    >
      {productItems.map((item) => (
        <ProductCard key={item.id} item={item} isLight={isLight} />
      ))}
    </DropdownShell>
  );
}
