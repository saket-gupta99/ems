import { MdCoPresent, MdGridView } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import SingleNav from "./SingleNav";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "./FullScreenSpinner";

function AttendanceSubmenus() {
  const { user, isLoading } = useUser();

  if (isLoading || !user?.data?.general) {
    return <FullScreenSpinner />;
  }

  const { role } = user.data.general;

  return (
    <div className="pl-3 flex flex-col gap-3 justify-center">
      <SingleNav
        text="View Attendance"
        icon={<MdGridView />}
        path="view-attendance"
      />
      <SingleNav
        text="Manage Attendance"
        icon={<FaRegPenToSquare />}
        path="manage-attendance"
      />
      {role === "admin" && (
        <SingleNav
          text="Employee Attendance"
          icon={<MdCoPresent />}
          path="employees-attendance"
        />
      )}
    </div>
  );
}

export default AttendanceSubmenus;
