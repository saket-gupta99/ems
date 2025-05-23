import { useGetAllEmployees } from "../features/employee/useGetAllEmployees";
import { extractDate } from "../utils/helper";
import FullScreenSpinner from "./FullScreenSpinner";

function Card({ data, handleClick }) {
  const { allEmployees, isLoading } = useGetAllEmployees();

  if (isLoading) return <FullScreenSpinner />;

  const leavesLeft = allEmployees.data.filter(
    (el) => el?.general?.employeeId === data?.employeeId
  )[0].general.totalLeavesAllowed;

  return (
    <div className="w-full max-w-lg mx-auto rounded shadow-sm md:grid grid-cols-2 gap-4 p-4">
      <div className="flex items-center gap-2">
        <img
          src={data?.photoUrl}
          alt="profile-photo"
          className="h-10 w-10 rounded-full"
        />
        <span className="text-slate-700 font-semibold capitalize text-lg">
          {data?.firstName + " " + data?.lastName}
        </span>
      </div>
      <div className="flex flex-col md:text-right">
        <span className="text-slate-700 font-semibold">Leave Type</span>
        <div className="flex items-center gap-x-1 md:justify-end">
          <span className="font-semibold uppercase">{data?.leaveType}</span>
        </div>
      </div>

      <div className="col-span-2 flex flex-wrap  gap-2 md:gap-4">
        <div className="flex flex-col">
          <span className="text-slate-700 font-semibold">From</span>
          <input
            type="text"
            value={extractDate(new Date(data?.startDate))}
            className="border md:p-1 w-32 text-center"
            disabled
          />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-700 font-semibold">To</span>
          <input
            type="text"
            value={extractDate(new Date(data?.endDate))}
            className="border md:p-1 w-32 text-center"
            disabled
          />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-700 font-semibold">Duration</span>
          <input
            type="text"
            value={data?.duration}
            className="border md:p-1 w-16 text-center font-semibold bg-slate-300"
            disabled
          />
        </div>
        <div className="flex flex-col">
          <span className="text-slate-700 font-semibold">Leaves Left</span>
          <input
            type="text"
            value={leavesLeft}
            className="border md:p-1 w-16 text-center bg-blue-400 font-semibold text-white"
            disabled
          />
        </div>
      </div>
      <div className="col-span-2">
        <span className="text-slate-700 font-semibold">Reason For Leave:</span>
        <input
          type="text"
          className="w-full p-1 border "
          disabled={true}
          value={data?.reasonForLeave}
        />
      </div>

      <div className="col-span-2 flex gap-2 p-2">
        <button
          className="bg-blue-600 sm:px-4 p-2 sm:py-2 cursor-pointer rounded text-white"
          onClick={() => handleClick(data, "approved")}
        >
          Approve
        </button>
        <button
          className="border border-gray-400 p-2 text-blue-600 sm:px-4 sm:py-2 cursor-pointer rounded"
          onClick={() => handleClick(data, "rejected")}
        >
          Reject
        </button>
      </div>
    </div>
  );
}

export default Card;
