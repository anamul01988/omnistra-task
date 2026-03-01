import { DropdownShell } from "./DropdownShell";

export default function SimpleDropdown({ isOpen, links, isLight }) {
  const linkColors = isLight
    ? "text-[#08144f]/60 hover:text-[#08144f] hover:bg-black/5"
    : "text-[#97a3b6] hover:text-white hover:bg-white/[0.05]";

  return (
    <DropdownShell
      isOpen={isOpen}
      isLight={isLight}
      className="p-[0.5rem] min-w-[12rem]"
    >
      {links.map((label) => (
        <a
          key={label}
          href="#"
          className={`block px-[1rem] py-[0.625rem] text-[0.8125rem] font-medium rounded-[0.75rem] whitespace-nowrap transition-all duration-300 ${linkColors}`}
        >
          {label}
        </a>
      ))}
    </DropdownShell>
  );
}
