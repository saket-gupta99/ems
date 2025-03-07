import { IoMdLogOut } from "react-icons/io";
import { useLogout } from "./useLogout";
import Spinner from "../../ui/Spinner";

function Logout() {
  const { logout, isLoading } = useLogout();
  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  
  return (
    <IoMdLogOut
      className="h-9 w-9 text-red-700 cursor-pointer"
      onClick={logout}
    />
  );
}

export default Logout;
