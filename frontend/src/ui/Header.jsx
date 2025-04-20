import { GiHamburgerMenu } from "react-icons/gi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import Logo from "./Logo";
import Logout from "../features/authentication/Logout";
import { useState } from "react";
import { Link } from "react-router-dom";

function Header({ isSidebarOpen, openSidebar, closeSidebar }) {
  const [openDots, setOpenDots] = useState(false);

  return (
    <div className="flex justify-between items-center col-span-2 bg-black text-white p-1">
      <div className="flex justify-center items-center">
        {isSidebarOpen ? (
          <RxCross1
            className="h-9 w-9 sm:h-7 sm:w-7 cursor-pointer"
            onClick={closeSidebar}
          />
        ) : (
          <GiHamburgerMenu
            className="h-9 w-9 sm:h-7 sm:w-7 cursor-pointer"
            onClick={openSidebar}
          />
        )}
        <Logo />
      </div>
      <div className="flex items-center justify-center gap-x-3 relative">
        <BsThreeDotsVertical
          size={20}
          className="hover:cursor-pointer"
          onClick={() => setOpenDots((open) => !open)}
        />
        {openDots && (
          <Link
            to="/reset-password"
            className="absolute top-8 text-black bg-white rounded-2xl right-5 w-[300%] text-center font-semibold shadow-2xl p-3"
            onClick={() => setOpenDots(false)}
          >
            Reset Password
          </Link>
        )}
        <Logout />
      </div>
    </div>
  );
}

export default Header;
