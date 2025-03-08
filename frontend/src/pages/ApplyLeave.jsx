import { useState } from "react";
import { FaCalendarPlus } from "react-icons/fa";
import { useApplyLeave } from "../features/leave/useApplyLeave";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import { differenceInDays } from "../utils/helper";

function ApplyLeaves() {
  const { applyLeave, isLoading } = useApplyLeave();
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reasonForLeave: "",
  });
  const errors = {};

  if (isLoading) {
    return <FullScreenSpinner />;
  }

  function handleChange(e) {
    return setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  let diffInDays =
    formData.endDate && differenceInDays(formData.startDate, formData.endDate) + 1;

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(errors).length > 0) return;

    return applyLeave(
      { data: formData },
      {
        onSuccess: () => {
          setFormData({});
          diffInDays = 0;
        },
      }
    );
  }

  if (formData.leaveType && !formData.leaveType) {
    errors.leaveType = "Select a leave type";
  }
  if (formData.startDate && !formData.startDate) {
    errors.startDate = "Select a start date";
  }
  if (formData.endDate && !formData.endDate) {
    errors.endDate = "Select a end date";
  }
  if (formData.reasonForLeave && formData.reasonForLeave.length <= 10) {
    errors.reasonForLeave = "Must be more than 20 length";
  }

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <FaCalendarPlus className="h-10 w-10 sm:h-8 sm:w-8" /> Apply Leave
      </h1>
      <form
        className="sm:w-[50%] w-full m-auto p-4 rounded shadow-2xl transition-transform duration-500"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 gap-5 p-3 sm:p-7 w-full m-auto ">
          <label>
            Leave Type*:
            <select
              value={formData.leaveType || ""}
              onChange={handleChange}
              name="leaveType"
              className="border p-1 w-full"
            >
              <option>Select Leave Type</option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Casual Leave">Casual Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Earned Leave">Earned Leave</option>
            </select>
            {errors.leaveType && (
              <p className="block text-red-500">{errors.leaveType}</p>
            )}
          </label>

          <label>
            Start Date*:
            <input
              type="date"
              className="border p-1 w-full"
              name="startDate"
              value={formData.startDate || ""}
              onChange={handleChange}
            />
            {errors.startDate && (
              <p className="block text-red-500">{errors.startDate}</p>
            )}
          </label>

          <label>
            End Date*:
            <input
              type="date"
              className="border p-1 w-full"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
            />
            {errors.endDate && (
              <p className="block text-red-500">{errors.endDate}</p>
            )}
          </label>

          <label>
            Day(s):
            <input
              type="text"
              name="days"
              className="border p-1 w-full disabled:bg-gray-300 disabled:cursor-not-allowed"
              disabled={true}
              value={(formData.endDate && diffInDays) || ""}
            />
          </label>

          <label>
            Reason*:
            <textarea
              rows={4}
              type="text"
              name="reasonForLeave"
              placeholder="Must be of more than 10 length"
              className="border p-1 w-full"
              value={formData.reasonForLeave || ""}
              onChange={handleChange}
            />
            {errors.reasonForLeave && (
              <p className="block text-red-500">{errors.reasonForLeave}</p>
            )}
          </label>

          <div className="flex justify-between">
            <button
              type="reset"
              className="px-3 sm:px-6 py-1 sm:py-2 bg-gray-300 rounded cursor-pointer"
            >
              Reset
            </button>
            <button
              type="submit"
              className="px-3 sm:px-6 py-1 sm:py-2 bg-blue-500 text-white rounded cursor-pointer"
            >
              Apply &gt;
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ApplyLeaves;
