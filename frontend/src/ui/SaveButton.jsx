import { FiSave } from "react-icons/fi";
function SaveButton() {
  return (
    <button
      type="submit"
      className="sm:col-start-2 sm:place-self-end place-self-center w-25 flex gap-2 justify-center items-center bg-gray-500 text-white p-2 rounded mt-5 sm:mt-2 cursor-pointer"
    >
      <FiSave />
      Save
    </button>
  );
}

export default SaveButton;
