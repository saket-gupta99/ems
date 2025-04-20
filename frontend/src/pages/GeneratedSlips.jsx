import { FaMoneyBills } from "react-icons/fa6";
import { useGetSalaryData } from "../features/salary/useGetSalaryData";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import Table from "../ui/Table";

const tableColumns = [
  { key: "employeeId", label: "Employee ID" },
  { key: "payrollMonth", label: "Payroll Month" },
  { key: "basicSalary", label: "Basic Salary" },
  { key: "allowances", label: "Allowances" },
  { key: "bonus", label: "Bonus" },
  { key: "deduction", label: "Deduction" },
  { key: "grossSalary", label: "Gross Salary" },
  { key: "netSalary", label: "Net Salary" },
  { key: "paymentMode", label: "Payment Mode" },
];

function GeneratedSlips() {
  const { getSalaryData, isLoading } = useGetSalaryData();

  if (isLoading) return <FullScreenSpinner />;

  const data = getSalaryData?.data
    ? getSalaryData.data
        .map((el) => ({
          ...el,
          deduction: el.deduction ? el.deduction.toFixed(2) : 0,
          netSalary: el.netSalary ? el.netSalary.toFixed(2) : 0,
          bonus: el.bonus ? el.bonus.toFixed(2) : 0,
          allowances: el.allowances ? el.allowances.toFixed(2) : 0,
        }))
        .reverse()
    : [];

  return (
    <>
      <h1 className="flex font-semibold gap-3 text-lg sm:text-xl sm:p-3 p-2 w-full shadow-xl items-center">
        <FaMoneyBills className="h-10 w-10 sm:h-8 sm:w-8" /> Generated Slips
      </h1>
      <div className="grid grid-cols-3 grid-rows-[auto_1fr] w-full shadow-2xl p-5 min-h-screen">
        {data.length > 0 && (
          <Table columns={tableColumns} data={data} text="All Slips" />
        )}
        {!data.length && <Table text="No Record Found" />}
      </div>
    </>
  );
}

export default GeneratedSlips;
