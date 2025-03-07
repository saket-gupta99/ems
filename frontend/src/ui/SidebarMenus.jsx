import { FaCalendar, FaUserAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { MdPeople } from "react-icons/md";
import SingleNav from "./SingleNav";
import LeaveSubmenu from "./LeaveSubmenu";
import AttendanceSubmenus from "./AttendanceSubmenus";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";
import EmployeeSubmenu from "./EmployeeSubmenu";
import SalarySubmenu from "./SalarySubmenu";

function SidebarMenus({ isDropdownClicked, handleDropdown, setSidebarOpen }) {
  const { user, isLoading } = useUser();

  if (isLoading || !user?.data?.general) {
    return <FullScreenSpinner />;
  }

  const { role } = user.data.general;

  return (
    <ul className="flex flex-col justify-center gap-3 w-full">
      <SingleNav
        text="Profile"
        icon={<FaUserAlt />}
        path="profile"
        setSidebarOpen={setSidebarOpen}
      />
      <SingleNav
        text="Attendance"
        icon={<FaCalendar />}
        onClick={() => handleDropdown(1)}
        dropdown={true}
      />
      {isDropdownClicked === 1 && (
        <AttendanceSubmenus setSidebarOpen={setSidebarOpen} />
      )}
      <SingleNav
        text="Leaves"
        icon={<MdOutlineAccessTimeFilled />}
        dropdown={true}
        onClick={() => handleDropdown(2)}
      />
      {isDropdownClicked === 2 && (
        <LeaveSubmenu setSidebarOpen={setSidebarOpen} />
      )}
      <SingleNav
        text="Salary"
        icon={<FaMoneyCheckAlt />}
        dropdown={true}
        onClick={() => handleDropdown(4)}
      />
      {isDropdownClicked === 4 && (
        <SalarySubmenu setSidebarOpen={setSidebarOpen} />
      )}
      {role === "admin" && (
        <SingleNav
          text="Employees"
          icon={<MdPeople />}
          dropdown={true}
          onClick={() => handleDropdown(3)}
        />
      )}
      {isDropdownClicked === 3 && (
        <EmployeeSubmenu setSidebarOpen={setSidebarOpen} />
      )}
    </ul>
  );
}

export default SidebarMenus;
