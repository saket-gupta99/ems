import { useGeolocation } from "../hooks/useGeolocation";
import { useGetAttendance } from "../features/attendance/useGetAttendance";
import { useUser } from "../features/authentication/useUser";
import { useCheckin } from "../features/attendance/useCheckin";
import { useCheckout } from "../features/attendance/useCheckout";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import toast from "react-hot-toast";
import { FaRegPenToSquare } from "react-icons/fa6";

function ManageAttendance() {
  const { isLoading, error, getLocation, location } = useGeolocation();
  const { getAttendance, isLoading: isLoading2 } = useGetAttendance();
  const { user, isLoading: isLoading3 } = useUser();
  const { checkIn, isLoading: isLoading4 } = useCheckin();
  const { checkOut, isLoading: isLoading5 } = useCheckout();

  if (
    isLoading ||
    isLoading2 ||
    isLoading3 ||
    isLoading4 ||
    isLoading5 ||
    !getAttendance?.data ||
    !user?.data?.general
  ) {
    return <FullScreenSpinner />;
  }
  if (error) {
    return <p>{error}</p>;
  }

  function handleCheckin() {
    if (!location) {
      return toast.error("Click on 'Get My Location'");
    }

    return checkIn({
      data: {
        date: new Date().setUTCHours(0,0,0,0),
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }

  function handleCheckout() {
    if (!location) {
      return toast.error("Click on 'Get My Location'");
    }

    return checkOut({
      data: {
        latitude: location.latitude,
        longitude: location.longitude,
      },
    });
  }

  const today = new Date();
  
  today.setUTCHours(0, 0, 0, 0);
  const userAttendance = getAttendance.data.find((el) => {
    const checkIn = new Date(el.checkIn);
    checkIn.setUTCHours(0, 0, 0, 0);
    return (
      el.employeeId === user.data.general.employeeId &&
      checkIn.getTime() === today.getTime()
    );
  });

  const hasCheckedIn = !!userAttendance;
  const hasCheckedOut = hasCheckedIn && userAttendance.checkOut !== null;

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <FaRegPenToSquare className="h-5 w-5 sm:h-8 sm:w-8" /> Manage Attendance
      </h1>

      <div className="shadow-2xl flex flex-col justify-center p-10">
        <div className="text-center space-y-3">
          <p className="font-semibold sm:text-lg">
            Make sure to click on the "Get My Location" button before check-in
            and check-out. You'll see a popup when you've checked-in or
            checked-out
          </p>
          <p className="font-semibold sm:text-lg text-red-400">
            Ensure you are within 100m radius of office
          </p>
          <button
            className="bg-gray-200 cursor-pointer p-3 sm:p-5 rounded"
            onClick={getLocation}
          >
            Get My Location
          </button>
          {location && (
            <div>
              <p>latitude: {location.latitude}</p>
              <p>longitude: {location.longitude}</p>
            </div>
          )}
        </div>
        <div className="text-center space-y-3 mt-5">
          <p className="font-semibold sm:text-lg">
            Click on below button to check-in or check-out
          </p>

          <button
            onClick={handleCheckin}
            className="sm:p-5 p-3 bg-green-300 m-2 rounded cursor-pointer disabled:cursor-not-allowed"
            disabled={hasCheckedIn}
          >
            Check In
          </button>
          <button
            onClick={handleCheckout}
            className="sm:p-5 p-3 bg-red-300 m-2 rounded cursor-pointer disabled:cursor-not-allowed"
            disabled={hasCheckedOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageAttendance;
