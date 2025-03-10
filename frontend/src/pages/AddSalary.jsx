import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import SaveButton from "../ui/SaveButton";
import { useAddSalaryData } from "../features/salary/useAddSalaryData";
import FullScreenSpinner from "../ui/FullScreenSpinner";

function AddSalary() {
  const [formData, setFormData] = useState({
    employeeId: "",
    bonus: "",
    allowances: "",
    payrollMonth: "",
    paymentMode: "",
    remarks: "",
  });
  const { addSalaryData, isLoading } = useAddSalaryData();

  if (isLoading) return <FullScreenSpinner />;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    addSalaryData({ data: formData });
  }

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <IoMdAdd className="h-10 w-10 sm:h-8 sm:w-8" /> Add Salary
      </h1>
      <div className="w-full p-5 shadow-2xl min-h-screen">
        <form
          className="grid grid-cols-1 sm:grid-cols-2 sm:gap-10 sm:space-y-20 space-y-10"
          onSubmit={handleSubmit}
        >
          <div>
            <label>
              Employee Id*:
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 uppercase"
                name="employeeId"
                value={formData.employeeId.toUpperCase() || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Bonus:
              <input
                type="number"
                className="w-full border border-gray-400 p-1 mb-2"
                name="bonus"
                value={formData.bonus || ""}
                onChange={handleChange}
              />
            </label>
            <label>
              Allowances:
              <input
                type="number"
                className="w-full border border-gray-400 p-1 mb-2"
                name="allowances"
                value={formData.allowances || ""}
                onChange={handleChange}
              />
            </label>
          </div>

          <div>
            <label>
              Payroll Month*:
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2"
                name="payrollMonth"
                placeholder="give value like 'MM-YYYY'"
                value={formData.payrollMonth || ""}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Remarks:
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2"
                name="remarks"
                value={formData.remarks || ""}
                onChange={handleChange}
              />
            </label>
            <label className="w-full">
              {" "}
              Payment Mode*:
              <div className="block w-full mb-4.5">
                {["bank transfer", "cash", "cheque"].map((option) => (
                  <label key={option} className="p-1 sm:px-2 w-full">
                    <input
                      type="radio"
                      name="paymentMode"
                      value={option}
                      checked={formData.paymentMode === option}
                      onChange={handleChange}
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </label>
          </div>

          <SaveButton />
        </form>
      </div>{" "}
    </>
  );
}

export default AddSalary;
