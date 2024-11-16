import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiFileText } from "react-icons/fi";

export const Sidebar = ({
  isExpanded,
  setIsExpanded,
}: {
  isExpanded: boolean;
  setIsExpanded: (state: boolean) => void;
}) => {
  const links = [
    { href: "/documents", label: "Documentos", icon: FiFileText },
  ];
  const pathname = usePathname();

  useEffect(() => {
    pathname == '/documents' && setIsExpanded(false);
  }, [pathname]);

  return (
    <div
      className={`bg-white fixed top-16 ${
        isExpanded ? "w-full sm:w-64" : "w-0 sm:w-20"
      } h-screen transition-all duration-300 z-20 border-r-2 border-[#E5E7EB] overflow-hidden`}
    >
      <nav className="mt-4 px-4">
        {links.map(({ href, label, icon: Icon }) => (
          <a
            key={label}
            href={href}
            className={`flex px-4 h-8 items-center rounded-md py-2 space-x-4 transition-colors duration-300 text-[#191E29] hover:bg-[#caffd6b4] ${
              pathname === href && "bg-[#CAFFD6]"
            }`}
          >
            <Icon className="text-xl" size={16} color="#191E29" />
            {isExpanded && <span>{label}</span>}
          </a>
        ))}
      </nav>
    </div>
  );
};
