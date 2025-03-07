import SingleNav from "./SingleNav";
import { IoIosAddCircle } from "react-icons/io";
import { FaList } from "react-icons/fa";

function EmployeeSubmenu({setSidebarOpen}) {
  return (
    <div className="pl-3 flex flex-col gap-3 justify-center">
      <SingleNav
        text="Add an employee"
        icon={<IoIosAddCircle />}
        path="add-employee"
        setSidebarOpen={setSidebarOpen}
      />
      <SingleNav
        text="Employee List"
        icon={<FaList />}
        path="employee-list"
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}

export default EmployeeSubmenu;
