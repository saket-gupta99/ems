import SingleNav from "./SingleNav";
import { MdRequestPage } from "react-icons/md";
import { FaMoneyBills } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";

function SalarySubmenu({ setSidebarOpen }) {
  const { user, isLoading } = useUser();
  if (isLoading) return <FullScreenSpinner />;

  return (
    <div className="pl-3 flex flex-col gap-3 justify-center">
      {user.data.general.role === "admin" && (
        <SingleNav
          text="Add salary"
          icon={<IoMdAdd />}
          path="add-salary"
          setSidebarOpen={setSidebarOpen}
        />
      )}
      {user.data.general.role === "admin" && (
        <SingleNav
          text="Generated Slips"
          icon={<FaMoneyBills />}
          path="generated-slips"
          setSidebarOpen={setSidebarOpen}
        />
      )}
      <SingleNav
        text="Salary Slip"
        icon={<MdRequestPage />}
        path="salary-slip"
        setSidebarOpen={setSidebarOpen}
      />
    </div>
  );
}

export default SalarySubmenu;
