import { FaCalendarPlus, FaRegCalendarCheck } from "react-icons/fa";
import { FaRegCalendarXmark } from "react-icons/fa6";
import { MdOutlinePreview } from "react-icons/md";
import SingleNav from "./SingleNav";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";

function LeaveSubmenu({setSidebarOpen}) {
  const { user, isLoading } = useUser();

  if (isLoading || !user?.data?.general) {
    return <FullScreenSpinner />;
  }

  const { role } = user.data.general;

  return (
    <div className="pl-3 flex flex-col gap-3 justify-center">
      <SingleNav
        text="Apply Leave"
        icon={<FaCalendarPlus />}
        path="apply-leave"
        setSidebarOpen={setSidebarOpen}
      />
      {role === "admin" && (
        <SingleNav
          text="Approve Leaves"
          icon={<FaRegCalendarCheck />}
          path="approve-leaves"
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {role === "admin" && (
        <SingleNav
          text="Employee Leaves"
          icon={<FaRegCalendarXmark />}
          path="employees-leaves"
          setSidebarOpen={setSidebarOpen}
        />
      )}
      <SingleNav
        text="View Leave"
        icon={<MdOutlinePreview />}
        path="view-leave"
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}

export default LeaveSubmenu;
