import { useEffect, useState } from "react";
import SaveButton from "../ui/SaveButton";
import { extractDate, formatDateToISO } from "../utils/helper";
import { useGeneral } from "../features/employee/useGeneral";
import FullScreenSpinner from "../ui/FullScreenSpinner";
import { FaFilePdf, FaFileWord, FaFileAlt } from "react-icons/fa";
import { useBankDetails } from "../features/employee/useBankDetails";

const getFileIcon = (url) => {
  if (/\.pdf$/i.test(url))
    return <FaFilePdf className="text-red-500 text-4xl" />;
  if (/\.docx?$/i.test(url))
    return <FaFileWord className="text-blue-500 text-4xl" />;
  return <FaFileAlt className="text-gray-500 text-4xl" />;
};

function EmployeeDetails({ employee }) {
  const [generalFormData, setGeneralFormData] = useState({
    phone: "",
    reference: "",
    reasonForLeaving: "",
    designation: "",
    dateOfJoining: "",
    dateOfLeaving: "",
    role: "",
    basicSalary: "",
    totalLeavesAllowed: "",
  });
  const [bankFormData, setBankFormData] = useState({
    name: "",
    accountNo: "",
    IFSCCode: "",
  });
  const { general, isLoading } = useGeneral();
  const { bankDetails, isLoading: isLoading2 } = useBankDetails();

  useEffect(() => {
    if (employee.general) {
      setGeneralFormData((prev) => ({ ...prev, ...employee.general }));
    }
    if (employee.bankDetails) {
      setBankFormData((prev) => ({ ...prev, ...employee.bankDetails }));
    }
  }, [employee]);

  if (isLoading || isLoading2) return <FullScreenSpinner />;

  function handleChange(e) {
    setGeneralFormData({ ...generalFormData, [e.target.name]: e.target.value });
  }

  function handleBankChange(e) {
    setBankFormData({ ...bankFormData, [e.target.name]: e.target.value });
  }

  function handleBankSubmit(e) {
    e.preventDefault();
    bankDetails({
      data: { ...bankFormData, employeeId: employee.general.employeeId },
    });
  }

  function handleGeneralSubmit(e) {
    e.preventDefault();
    general({ data: generalFormData });
  }

  return (
    <div className="overflow-auto p-2 flex-grow max-h-[95vh]">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-center">General Section</h2>
        <form
          className="grid grid-cols-1 p-2 sm:grid-cols-2 sm:gap-5"
          onSubmit={handleGeneralSubmit}
        >
          <div>
            <label>
              Employee ID:{" "}
              <input
                type="text"
                name="employeeId"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee.general.employeeId || ""}
                disabled={true}
              />
            </label>
            <label>
              Email ID:{" "}
              <input
                type="email"
                name="email"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={true}
                value={employee.general.email || ""}
              />
            </label>
            <label>
              First Name:{" "}
              <input
                type="text"
                name="firstName"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee.general.firstName || ""}
                disabled={true}
              />
            </label>
            <label>
              Last Name:{" "}
              <input
                type="text"
                name="lastName"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee.general.lastName || ""}
                disabled={true}
              />
            </label>
            <label>
              Phone no:{" "}
              <input
                type="text"
                name="phone"
                className="w-full border border-gray-400 p-1 mb-2"
                defaultValue={
                  employee.general.phone || generalFormData.phone || ""
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Designation:{" "}
              <input
                type="text"
                name="designation"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                defaultValue={
                  employee.general.designation ||
                  generalFormData.designation ||
                  ""
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Role:{" "}
              <input
                type="text"
                name="role"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                defaultValue={
                  employee.general.role || generalFormData.role || ""
                }
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Date of Joining:{" "}
              <input
                type="date"
                name="dateOfJoining"
                className="w-full border border-gray-400 p-1 mb-2"
                defaultValue={
                  formatDateToISO(employee.general.dateOfJoining) ||
                  generalFormData.dateOfJoining ||
                  ""
                }
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Date of Leaving:{" "}
              <input
                type="date"
                name="dateOfLeaving"
                className="w-full border border-gray-400 p-1 mb-2"
                defaultValue={
                  employee.general.dateOfLeaving ||
                  generalFormData.dateOfLeaving ||
                  ""
                }
                onChange={handleChange}
              />
            </label>
            <label>
              Reference:{" "}
              <input
                type="text"
                name="reference"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                defaultValue={
                  employee.general.reference || generalFormData.reference || ""
                }
                onChange={handleChange}
              />{" "}
            </label>
            <label>
              Reason for leaving:{" "}
              <input
                type="text"
                name="reasonForLeaving"
                className="w-full border border-gray-400 p-1 mb-2"
                defaultValue={
                  employee.general.reasonForLeaving ||
                  generalFormData.reasonForLeaving ||
                  ""
                }
                onChange={handleChange}
              />{" "}
            </label>
            <label>
              Basic Salary:{" "}
              <input
                type="text"
                name="basicSalary"
                className="w-full border border-gray-400 p-1 mb-2"
                defaultValue={
                  employee.general.basicSalary ||
                  generalFormData.basicSalary ||
                  ""
                }
                onChange={handleChange}
              />{" "}
            </label>
            <label>
              Total leaves allowed:{" "}
              <input
                type="text"
                name="totalLeavesAllowed"
                className="w-full border border-gray-400 p-1 mb-2"
                defaultValue={
                  employee.general.totalLeavesAllowed ||
                  generalFormData.totalLeavesAllowed ||
                  ""
                }
                onChange={handleChange}
              />{" "}
            </label>
          </div>
          <SaveButton />
        </form>
      </div>

      {/* personal section */}
      <div className="w-full border-t py-10">
        <h2 className="text-xl font-semibold text-center">Personal Section</h2>
        <div className="grid grid-cols-1 p-2 sm:grid-cols-2 sm:gap-5">
          <div>
            <label>
              Date of Birth:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={
                  employee?.personal?.dateOfBirth
                    ? extractDate(new Date(employee?.personal?.dateOfBirth))
                    : employee?.personal?.dateOfBirth
                }
                disabled={true}
              />
            </label>
            <label>
              Aadhar Number:{" "}
              <input
                type="number"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.personal?.aadharNo}
                disabled={true}
              />
            </label>
            <label>
              Pan Number:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.personal?.panNo}
                disabled={true}
              />
            </label>
          </div>

          <div>
            <label>
              Gender:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.personal?.gender}
                disabled={true}
              />
            </label>
            <label>
              Blood Group:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 uppercase disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.personal?.bloodGroup}
                disabled={true}
              />
            </label>
            <label>
              Marital Status:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.personal?.maritalStatus}
                disabled={true}
              />
            </label>
          </div>
        </div>
      </div>

      {/* contacts section */}
      <div className="w-full border-t py-10">
        <h2 className="text-xl font-semibold text-center">Contacts Section</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5">
          <div>
            <label>
              Present Address:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed capitalize"
                value={employee?.contact?.presentAddress}
                disabled={true}
              />
            </label>
            <label>
              Present City:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.contact?.presentCity}
                disabled={true}
              />
            </label>
            <label>
              Present Pincode:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.contact?.presentPinCode}
                disabled={true}
              />
            </label>
            <label>
              Present State:
              <input
                type="text"
                value={employee?.contact?.presentState}
                disabled={true}
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
              />
            </label>
            <label>
              Emergency Contact:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.contact?.emergencyContact}
                disabled={true}
              />
            </label>
          </div>

          <div>
            <label>
              Permanent Address:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-300 disabled:cursor-not-allowed capitalize"
                value={employee?.contact?.permanentAddress}
                disabled={true}
              />
            </label>
            <label>
              Permanent City:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={true}
                value={employee?.contact?.permanentCity}
              />
            </label>
            <label>
              Permanent Pincode:{" "}
              <input
                type="text"
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                value={employee?.contact?.permanentPinCode}
                disabled={true}
              />
            </label>
            <label>
              Permanent State:
              <input
                type="text"
                value={employee?.contact?.permanentState}
                className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-300 disabled:cursor-not-allowed"
                disabled={true}
              />
            </label>
          </div>
        </div>
      </div>

      {/* attachment section */}
      {employee.attachments.length > 0 && (
        <div className="w-full border-t py-10">
          <h2 className="text-xl font-semibold text-center">
            Attachments Section{" "}
          </h2>
          {employee.attachments.length > 0 &&
            employee.attachments.map((el, id) => {
              const isImage = /\.(jpeg|jpg|png|gif|bmp|webp)$/i.test(
                el.attachmentUrl
              );

              return (
                <div key={id} className="p-2 flex flex-col items-center">
                  {isImage ? (
                    <img
                      src={el.attachmentUrl}
                      alt={el.fileName || "Uploaded Image"}
                      className="w-40 h-40 object-cover border rounded"
                    />
                  ) : (
                    <a
                      href={el.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center text-blue-500 underline"
                    >
                      {getFileIcon(el.attachmentUrl)}
                      <span>{el?.fileName || "View Document"}</span>
                    </a>
                  )}
                </div>
              );
            })}
        </div>
      )}

      {/* bank details section */}
      <div className="w-full border-t py-10">
        <h2 className="text-xl font-semibold text-center">
          Bank Details Section
        </h2>
        <form
          className="grid grid-cols-1 p-2 sm:grid-cols-2 sm:gap-5"
          onSubmit={handleBankSubmit}
        >
          <div>
            <label>
              Bank Name:
              <input
                type="text"
                name="name"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                defaultValue={
                  employee?.bankDetails?.name || bankFormData.name || ""
                }
                onChange={handleBankChange}
              />
            </label>
            <label>
              Bank Account No:
              <input
                type="text"
                name="accountNo"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                defaultValue={
                  employee?.bankDetails?.accountNo ||
                  bankFormData.accountNo ||
                  ""
                }
                onChange={handleBankChange}
              />
            </label>
          </div>
          <div>
            <label>
              Bank IFSC Code:
              <input
                type="text"
                name="IFSCCode"
                className="w-full border border-gray-400 p-1 mb-2 capitalize"
                defaultValue={
                  employee?.bankDetails?.IFSCCode || bankFormData.IFSCCode || ""
                }
                onChange={handleBankChange}
              />
            </label>
          </div>
          <SaveButton />
        </form>
      </div>
    </div>
  );
}

export default EmployeeDetails;
