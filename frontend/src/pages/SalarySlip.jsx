import { MdRequestPage } from "react-icons/md";
import { useGetSalarySlip } from "../features/salary/useGetSalarySlip";
import { useUser } from "../features/authentication/useUser";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import { useState } from "react";

function SalarySlip() {
  const [payrollMonth, setPayrollMonth] = useState("");

  const { getSalarySlip, isLoading } = useGetSalarySlip();
  const { user, isLoading: isLoading2 } = useUser();

  function handleSubmit(e) {
    e.preventDefault();
    getSalarySlip({
      data: { payrollMonth, employeeId: user.data.general.employeeId },
    });
  }

  if (isLoading || isLoading2) return <FullScreenSpinner />;

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <MdRequestPage className="h-10 w-10 sm:h-8 sm:w-8" /> Salary Slip
      </h1>
      <div className="w-full p-5 shadow-2xl flex items-center justify-center">
        <form
          className="flex flex-col w-full justify-center space-y-1.5 sm:min-h-100"
          onSubmit={handleSubmit}
        >
          <h1 className="text-xl font-semibold text-center my-5">
            Generate Payslip
          </h1>
          <label>
            Payroll Month:
            <input
              type="text"
              name="payrollMonth"
              className="border p-1 ml-1"
              placeholder="give value like 'MM-YYYY'"
              value={payrollMonth || ""}
              onChange={(e) => setPayrollMonth(e.target.value)}
              required
            />
          </label>
          <button
            type="submit"
            className="p-3 bg-blue-500 rounded hover:bg-blue-600 text-white cursor-pointer"
          >
            Get Slip
          </button>
        </form>
      </div>
    </>
  );
}

export default SalarySlip;
