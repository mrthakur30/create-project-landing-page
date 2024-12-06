import React from "react";
import Logo from "../assets/navlogo.svg"
import { Contact, Phone, PhoneIcon } from "lucide-react";
const Header: React.FC = ({ onClick }: any) => {
    return (
        <header className="navbar bg-white px-4 lg:px-6">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl flex items-center" href="#">
                    <div className="flex md:gap-3 text-white items-center justify-center gap-2 font-semibold text-xl md:text-2xl">
                        <img src={Logo} alt="Logo" className="md:h-10 h-7" />
                    </div>
                </a>
            </div>
            <a href="https://api.whatsapp.com/send?phone=+917892516337&text=Hello,%20I%20would%20like%20to%20know%20more%20about%20Your%Designs" target="_blank" rel="noopener noreferrer">
                <button type="button" onClick={onClick} className="btn  bg-yellow-200 hover:bg-yellow-300 text-zinc-700 border-0 ">
                    Get In Touch
                    <PhoneIcon />
                </button>
            </a>
        </header>
    );
};

export default Header;
