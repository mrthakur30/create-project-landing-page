import React from "react";
import Logo from "../assets/navlogo.svg"
import { Phone } from "lucide-react";
const Header: React.FC = ({ onClick }: any) => {
    return (
        <header className="navbar bg-base-100 dark:bg-emerald-700 px-4 lg:px-6">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl flex items-center" href="#">
                    <div className="flex md:gap-3 text-white items-center justify-center gap-2 font-semibold text-xl md:text-2xl">
                        <img src={Logo} alt="Logo" className="md:h-10 h-7" />
                    </div>
                </a>
            </div>
      
            <button type="button" onClick={onClick} className="btn  bg-emerald-600 border-0 hover:bg-emerald-500">
                <Phone color="white" />
            </button>
        </header>
    );
};

export default Header;
