import { FaRegCalendarCheck } from "react-icons/fa6";
import { useGetLeaves } from "../features/leave/useGetLeaves";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Card from "../ui/Card";
import { useReviewLeave } from "../features/leave/useReviewLeave";
import { useUser } from "../features/authentication/useUser";
import toast from "react-hot-toast";
import { useEffect } from "react";

function ApproveLeaves() {
  const { getLeaves, isLoading } = useGetLeaves();
  const { reviewLeave, isLoading: isLoading2 } = useReviewLeave();
  const { user, isLoading: isLoading3 } = useUser();

  useEffect(() => {
    if (getLeaves?.data && !isLoading) {
      const expiredLeaves = getLeaves.data.filter((el) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startDate = new Date(el.startDate);
        startDate.setHours(0, 0, 0, 0);

        return (
          el.status === "pending" &&
          startDate.getTime() < today.getTime()
        );
      });

      expiredLeaves.forEach((el) =>
        reviewLeave({ data: { ...el, action: "rejected" } })
      );
    }
  }, [getLeaves, reviewLeave, isLoading]);

  if (
    isLoading ||
    isLoading2 ||
    isLoading3 ||
    !user.data.general ||
    !getLeaves.data
  ) {
    return <FullScreenSpinner />;
  }

  function handleClick(el, action) {
    if (user.data.general.employeeId !== el.employeeId) {
      return reviewLeave({ data: { ...el, action } });
    }
    return toast.error("You can't approve your own leave");
  }

  const data = getLeaves.data.filter((el) => el.status === "pending");

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <FaRegCalendarCheck className="h-10 w-10 sm:h-8 sm:w-8" /> Approve
        Leaves
      </h1>
      <div className="min-h-screen shadow-2xl">
      <div className="grid grid-cols-1 w-full p-5 justify-items-center">
        {data?.map((el) => (
          <Card key={el.employeeId} data={el} handleClick={handleClick} />
        ))}
      </div>
      {!data.length && (
        <div className="grid grid-cols-1 w-full shadow-2xl p-5 justify-items-center text-2xl font-semibold">
          No Leaves to review
        </div>
      )}
      </div>
    </>
  );
}

export default ApproveLeaves;
