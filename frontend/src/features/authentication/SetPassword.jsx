import { useState } from "react";
import toast from "react-hot-toast";
import { useSetPassword } from "./useSetPassword";
import FullScreenSpinner from "../../ui/FullScreenSpinner";

function SetPassword() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { setPassword, isLoading } = useSetPassword();

  if (isLoading) return <FullScreenSpinner />;

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      return toast.error("Enter all fields");
    }

    setPassword({ data: formData });
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="relative flex justify-center gap-2 items-center flex-col p-4 shadow-2xl xs:p-8 sm:p-10 md:p-12 rounded-md">
        <h1 className="text-2xl font-semibold text-center">
          Set Your Password
        </h1>
        <form className="grid gap-2 m-2 xs:m-4 w-full" onSubmit={handleSubmit}>
          <label>
            Email ID:{" "}
            <input
              type="email"
              className="border border-gray-400 rounded-sm p-0.5 sm:p-1 w-full"
              name="email"
              placeholder="Enter your email id"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Enter Password:
            <input
              type="password"
              placeholder="Enter password"
              className="border border-gray-400 rounded-sm p-0.5 sm:p-1 w-full"
              name="password"
              value={formData.password || ""}
              onChange={handleChange}
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              placeholder="Enter confirm password"
              className="border border-gray-400 rounded-sm p-0.5 sm:p-1 w-full"
              name="confirmPassword"
              value={formData.confirmPassword || ""}
              onChange={handleChange}
            />
          </label>
          <button
            type="submit"
            className="p-1 text-base xs:text-xl bg-black text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800"
          >
            Sumbit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SetPassword;
