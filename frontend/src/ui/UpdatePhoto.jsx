import { useState } from "react";
import { useUser } from "../features/authentication/useUser";
import { useAttachment } from "../features/employee/useAttachment";
import FullScreenSpinner from "./FullScreenSpinner";
import toast from "react-hot-toast";
import { RxCross1 } from "react-icons/rx";

function UpdatePhoto({ setPhotoClicked }) {
  const { user, isLoading } = useUser();
  const { attachFile, isPending } = useAttachment();
  const [file, setFile] = useState(null);

  if (!user.data.general || isLoading || isPending) {
    return <FullScreenSpinner />;
  }

  function handleFileChange(e) {
    setFile(e.target.files[0]);
  }

  function handleUpdate() {
    if (!file) {
      return toast.error("Please select a file!");
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isPhoto", "true");

    attachFile(
      { data: formData },
      {
        onSuccess: () => {
          setFile(null);
        },
      }
    );

    setPhotoClicked(false);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/80 z-[1000] p-2">
      <div className="bg-white shadow-xl rounded-md w-full max-w-md">
        <div className="relative">
          <h2 className="bg-black text-white p-2 sm:text-center text-left sm:text-2xl font-bold">
            Update Your Profile Picture
          </h2>
          <RxCross1
            onClick={() => setPhotoClicked(false)}
            className="text-white absolute right-1 top-1 cursor-pointer  h-8 w-8 sm:h-10 sm:w-10"
          />
        </div>
        <div className="text-center my-4 sm:p-2">
          <img
            src={user?.data.general.photoUrl}
            alt="profile-photo"
            className="sm:w-40 sm:h-40 h-32 w-32 rounded-full mx-auto border"
          />
          <h2 className="mt-2 font-medium sm:text-xl">Upload Picture</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-1 w-full justify-between border border-t-2 pt-2">
          <input
            type="file"
            className="border sm:py-2 sm:px-6 cursor-pointer"
            onChange={handleFileChange}
          />
          <button
            className="bg-blue-500 text-white sm:py-3 sm:px-6 cursor-pointer"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default UpdatePhoto;
