import SingleNav from "./SingleNav";
import { MdRequestPage } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";

function SalarySubmenu() {
  const { user, isLoading } = useUser();
  if (isLoading) return <FullScreenSpinner />;

  return (
    <div className="pl-3 flex flex-col gap-3 justify-center">
      {user.data.general.role === "admin" && (
        <SingleNav text="Add salary" icon={<IoMdAdd />} path="add-salary" />
      )}
      <SingleNav
        text="Salary Slip"
        icon={<MdRequestPage />}
        path="salary-slip"
      />
    </div>
  );
}

export default SalarySubmenu;
