import { useEffect, useState } from "react";
import { useUser } from "../authentication/useUser";
import { useContact } from "./useContact";
import FullScreenSpinner from "../../ui/FullScreenSpinner";
import SaveButton from "../../ui/SaveButton";
import validator from "validator";

function ContactTab() {
  const { user, isLoading } = useUser();
  const { contact, isLoading: isLoading2 } = useContact();
  const [formData, setFormData] = useState({
    presentAddress: "",
    presentCity: "",
    presentPinCode: "",
    presentState: "",
    sameAsPresent: "",
    permanentAddress: "",
    permanentCity: "",
    permanentPinCode: "",
    permanentState: "",
    emergencyContact: "",
  });
  const errors = {};

  useEffect(() => {
    if (user?.data?.contact) {
      setFormData(user.data.contact);
    }
  }, [user]);

  function handleChange(e) {
    const { name, type, value, checked } = e.target;

    return setFormData((prev) => {
      if (name === "sameAsPresent") {
        return {
          ...prev,
          [name]: checked,
          ...(checked && {
            permanentAddress: prev.presentAddress,
            permanentCity: prev.presentCity,
            permanentPinCode: prev.presentPinCode,
            permanentState: prev.presentState,
          }),
        };
      }
      return { ...prev, [name]: type === "checkbox" ? checked : value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const updatedFormData = { ...formData };

    if (formData.sameAsPresent) {
      updatedFormData.permanentAddress = formData.presentAddress;
      updatedFormData.permanentCity = formData.presentCity;
      updatedFormData.permanentPinCode = formData.presentPinCode;
      updatedFormData.permanentState = formData.presentState;
    }

    return contact({ data: updatedFormData });
  }

  if (isLoading || isLoading2 || !user?.data?.contact) {
    return <FullScreenSpinner />;
  }

  if (
    (formData.presentPinCode &&
      formData.presentPinCode.toString().length !== 6) ||
    (formData.permanentPinCode &&
      formData.permanentPinCode.toString().length !== 6)
  ) {
    errors.pincode = "pincodes should be of length 6";
  }

  if (
    formData.emergencyContact &&
    !validator.isMobilePhone(formData.emergencyContact, "en-IN")
  ) {
    errors.emergencyContact = "Enter a valid phone number";
  }

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 sm:gap-5"
      onSubmit={handleSubmit}
    >
      <div>
        <label>
          Present Address*:{" "}
          <textarea
            rows={3}
            name="presentAddress"
            className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed capitalize"
            value={formData.presentAddress || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Present City*:{" "}
          <input
            type="text"
            name="presentCity"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            value={formData.presentCity || ""}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Present Pincode*:{" "}
          <input
            type="text"
            name="presentPinCode"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            value={formData.presentPinCode || ""}
            onChange={handleChange}
            required
          />
        </label>
        {errors.pincode && (
          <p className="block text-red-500">{errors.pincode}</p>
        )}
        <label>
          Present State*:
          <select
            value={formData.presentState || ""}
            onChange={handleChange}
            name="presentState"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            required
          >
            <option>Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">
              Dadra and Nagar Haveli and Daman and Diu
            </option>
            <option value="Delhi">Delhi</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </select>
        </label>
        <label>
          Emergency Contact*:{" "}
          <input
            type="text"
            name="emergencyContact"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            value={formData.emergencyContact || ""}
            onChange={handleChange}
            required
          />
        </label>
        {errors.emergencyContact && (
          <p className="block text-red-500">{errors.emergencyContact}</p>
        )}
      </div>

      <div>
        <label className="flex mb-3">
          Same as Present Address?:
          <input
            type="checkbox"
            name="sameAsPresent"
            className="w-fit block sm:mb-8 ml-5 mt-2"
            checked={formData.sameAsPresent || ""}
            onChange={handleChange}
          />
        </label>

        <label>
          Permanent Address*:{" "}
          <textarea
            rows={3}
            name="permanentAddress"
            className="w-full border border-gray-400 p-1 mb-2 disabled:bg-gray-200 disabled:cursor-not-allowed capitalize"
            value={
              formData.sameAsPresent
                ? formData.presentAddress
                : formData.permanentAddress
            }
            onChange={handleChange}
            disabled={formData.sameAsPresent || ""}
            required
          />
        </label>
        <label>
          Permanent City*:{" "}
          <input
            type="text"
            name="permanentCity"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            value={
              formData.sameAsPresent
                ? formData.presentCity
                : formData.permanentCity || ""
            }
            onChange={handleChange}
            disabled={formData.sameAsPresent}
            required
          />
        </label>
        <label>
          Permanent Pincode*:{" "}
          <input
            type="text"
            name="permanentPinCode"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            value={
              formData.sameAsPresent
                ? formData.presentPinCode
                : formData.permanentPinCode || ""
            }
            onChange={handleChange}
            disabled={formData.sameAsPresent}
            required
          />
        </label>
        {errors.pincode && (
          <p className="block text-red-500">{errors.pincode}</p>
        )}
        <label>
          Permanent State*:
          <select
            value={
              formData.sameAsPresent
                ? formData.presentState
                : formData.permanentState || ""
            }
            onChange={handleChange}
            name="permanentState"
            className="w-full border border-gray-400 p-1 mb-2 capitalize disabled:bg-gray-200 disabled:cursor-not-allowed"
            disabled={formData.sameAsPresent}
            required
          >
            <option>Select State</option>
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Dadra and Nagar Haveli and Daman and Diu">
              Dadra and Nagar Haveli and Daman and Diu
            </option>
            <option value="Delhi">Delhi</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Ladakh">Ladakh</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
          </select>
        </label>
        <div className="sm:mt-16">
          <SaveButton />
        </div>
      </div>
  
    </form>
  );
}

export default ContactTab;
