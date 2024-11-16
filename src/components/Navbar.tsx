import { FiMenu, FiBell, FiUser } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import Image from "next/image";

export const Navbar = ({
  onToggleSidebar,
}: {
  onToggleSidebar: () => void;
}) => {
  return (
    <div className="w-full h-16 bg-white text-white fixed top-0 left-0 flex items-center justify-between px-4 z-10 shadow-md">
      <div className="flex items-center">
        <button
          onClick={onToggleSidebar}
          className="text-white h-10 text-2xl p-2 mr-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          <FiMenu color="#191E29" />
        </button>
        <Image
          src="/images/rvlTecnologia.png"
          alt="Rvl Tecnologia imagem"
          width={100}
          height={100}
          className="hidden sm:block"
        />
      </div>

      <div className="flex items-center space-x-4">
        <button className="text-white text-xl p-2 rounded-md">
          <FiBell color="#191E29" />
        </button>

        <div className="px-2 py-2 h-12 rounded-md flex items-center border border-[#E5E7EB]">
          <div className="flex h-8 w-8 rounded-full border-2 border-[#E5E7EB] items-center justify-center">
            <FiUser color="#191E29" size={24} />
          </div>
          <div className="hidden sm:flex flex-col ml-2 mr-2">
            <span className="text-[#3A424E] font-bold text-sm">Felipi Matias</span>
            <span className="text-[#6B7280] -mt-1 text-xs">RVL Tecnologia</span>
          </div>
          <RiArrowDownSLine className="hidden sm:block" color="#191E29" size={24} />
        </div>
      </div>
    </div>
  );
};
