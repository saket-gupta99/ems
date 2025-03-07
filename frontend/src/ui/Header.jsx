import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross1 } from "react-icons/rx";
import Logo from "./Logo";
import Logout from "../features/authentication/Logout";

function Header({ isSidebarOpen, openSidebar, closeSidebar }) {
  return (
    <div className="flex justify-between items-center col-span-2 bg-black text-white p-1">
      <div className="flex justify-center items-center">
        {isSidebarOpen ? (
          <RxCross1 className="h-9 w-9 cursor-pointer" onClick={closeSidebar} />
        ) : (
          <GiHamburgerMenu
            className="h-9 w-9 cursor-pointer"
            onClick={openSidebar}
          />
        )}
        <Logo />
      </div>
      <div>
        <Logout />
      </div>
    </div>
  );
}

export default Header;
