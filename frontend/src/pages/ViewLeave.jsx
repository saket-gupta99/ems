import { MdOutlinePreview } from "react-icons/md";
import { differenceInDays, extractDate } from "../utils/helper";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Table from "../ui/Table";
import { useGetLeaveById } from "../features/leave/useGetLeaveById";
import { useUser } from "../features/authentication/useUser";

const columns = [
  { key: "appliedOn", label: "Applied On" },
  { key: "onLeave", label: "On Leave" },
  { key: "duration", label: "Duration" },
  { key: "status", label: "Status" },
];

const formatData = (el) => {
  const {  status, createdAt, startDate, endDate } = el;

  return {
    duration: differenceInDays(startDate, endDate) + 1,
    appliedOn: extractDate(new Date(createdAt)),
    status,
    onLeave:
      extractDate(new Date(startDate)) +
      " to " +
      extractDate(new Date(endDate)),
  };
};

function ViewLeave() {
  const { user, isLoading } = useUser();
  const { getLeaveById, isLoading: isLoading2 } = useGetLeaveById(
    user?.data?.general?.employeeId
  );

  if (isLoading || isLoading2 || !user.data.general || !getLeaveById.data) {
    return <FullScreenSpinner />;
  }

  const data = getLeaveById.data.map((el) => formatData(el));
  console.log(data)

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <MdOutlinePreview className="h-5 w-5 sm:h-8 sm:w-8" /> View Leave
      </h1>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full shadow-2xl p-5">
        {data.length > 0 && (
          <Table columns={columns} data={data} text="All Leaves" />
        )}
        {!data.length && <Table text="No Record Found" />}
      </div>
    </>
  );
}

export default ViewLeave;
