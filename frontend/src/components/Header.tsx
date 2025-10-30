"use client";

import { useRouter } from "next/navigation";
import { User } from "lucide-react";
import Image from "next/image";
import Logo from "../images/Comfama_logo.svg";
import { useNavigation } from "../hooks/useNavigation";

type HeaderProps = {};

const Header = ({}: HeaderProps) => {
  const router = useRouter();
  const { getSectionName } = useNavigation();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <header className="bg-[#ffffff] px-6 py-4 flex items-center justify-between shadow-md border-b border">
      <div className="flex items-center gap-3">
        <button
          onClick={handleLogoClick}
          className="cursor-pointer hover:scale-105 transition-transform duration-200 rounded-lg "
        >
          <Image src={Logo} alt="Logo" width={150} height={100} />
        </button>
      </div>
      <div className="flex items-center space-x-6">
        <span className="text-lg text-white bg-[#FF277E] px-2 py-1 rounded-lg font-medium">
          {getSectionName()}
        </span>
        <div className="w-8 h-8 bg-[#FF277E] rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
      </div>
    </header>
  );
};

export default Header;
