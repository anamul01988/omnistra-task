export default function NavButton({
  label,
  onClick,
  isActive,
  isLink,
  href,
  isLight,
}) {
  const baseStyles =
    "inline-flex items-center gap-[0.375rem] p-[0.625em] rounded-full text-[0.8125rem] font-medium uppercase transition-all duration-300 whitespace-nowrap relative font-sans cursor-pointer";

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
