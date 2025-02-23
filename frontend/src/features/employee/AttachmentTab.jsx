import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useAttachment } from "./useAttachment";
import FullScreenSpinner from "../../ui/FullScreenSpinner";
import toast from "react-hot-toast";

function AttachmentTab() {
  const [formData, setFormData] = useState({
    documentType: "",
    file: null,
    description: "",
  });
  const { attachFile, isLoading, isPending } = useAttachment();

  if (isLoading || isPending) {
    return <FullScreenSpinner />;
  }

  function handleChange(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, file }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!formData.file) {
      return toast.error("No file selected");
    }

    const formDataToSend = new FormData();
    formDataToSend.append("documentType", formData.documentType.toLowerCase());
    formDataToSend.append("file", formData.file);
    formDataToSend.append("description", formData.description);

    attachFile(
      { data: formDataToSend },
      {
        onSuccess: () => {
          setFormData({ documentType: "", file: null, description: "" });
        },
      }
    );
  }

  return (
    <form
      className="grid grid-cols-1 sm:grid-cols-2 gap-5"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col gap-1">
        <label>
          Document Type*:
          <select
            className="w-full border border-gray-400 p-1 mb-2"
            name="documentType"
            value={formData.documentType || ""}
            onChange={handleChange}
            required
          >
            <option>Select type</option>
            <option value="Company Letters">Company Letters</option>
            <option value="ID Proofs">ID Proofs</option>
            <option value="Education Certificates">
              Education Certificates
            </option>
            <option value="Other">Other</option>
          </select>
        </label>

        <label className="block mb-2">
          Attachment*:
          <input
            type="file"
            className="w-full border border-gray-400 p-1  file:bg-gray-300 file:border file:border-gray-500 file:px-4 file:py-1 file:cursor-pointer"
            name="file"
            onChange={handleFileChange}
            required
          />
          <span className="text-xs sm:text-sm text-slate-500">
            pdf, jpg, jpeg, docx, png and doc file upto 2MB is allowed
          </span>
        </label>

        <label>
          Description:
          <textarea
            rows={4}
            value={formData.description || ""}
            name="description"
            onChange={handleChange}
            className="w-full border border-gray-400 p-1 mb-2"
          />
        </label>

        <button
          type="submit"
          className="sm:col-start-2 sm:place-self-end place-self-center w-25 flex gap-2 justify-center items-center bg-gray-500 text-white p-2 rounded mt-5 sm:mt-2 cursor-pointer"
        >
          <IoMdAdd size={20} /> Add
        </button>
      </div>
    </form>
  );
}

export default AttachmentTab;
