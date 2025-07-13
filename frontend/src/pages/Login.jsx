import { useState } from "react";
import LoginForm from "../features/authentication/LoginForm";
import { FaUserCircle } from "react-icons/fa";
import Register from "../features/authentication/Register";

function Login() {
  const [page, setPage] = useState("login");

  return (
    <div className="flex relative justify-center items-center min-h-screen ">
      <div className="relative flex justify-center gap-2 items-center flex-col p-4 shadow-2xl xs:p-8 sm:p-10 md:p-12 rounded-md">
        <div className="absolute top-0 flex justify-evenly w-full font-bold bg-black text-white divide-x rounded-t-md">
          <button
            onClick={() => setPage("login")}
            className="text-xl p-3 sm:p-4 cursor-pointer w-full"
          >
            Login
          </button>
          <button
            onClick={() => setPage("register")}
            className="text-xl p-3 sm:p-4 cursor-pointer w-full "
          >
            Verify
          </button>
        </div>

        <FaUserCircle className="h-18 w-18 xs:h-22 xs:w-22 sm:h-26 sm:w-26 md:h-32 md:w-32 lg:h-36 mt-10 lg:w-36" />
        <h1 className="text-3xl font-semibold text-center">
          {page === "login" ? "Login to your account" : "Verify your account"}
        </h1>
        {page === "login" ? <LoginForm /> : <Register />}
      </div>

      <div className="text-slate-800 lg:w-64 text-[8px] lg:text-sm absolute bottom-0 md:right-0 md:bottom-auto p-10 shadow-md space-y-5">
        <div>
          <p>Admin id: EMP1</p>
          <p>Admin password: Saket@321</p>
        </div>
        <div>
          <p>Employee id: EMP8</p>
          <p>Employee password: Gaurav@123</p>
        </div>
        <p><em><strong>(You might need to wait around 50s for the server to start as it's hosted on free tier)</strong></em></p>
      </div>
    </div>
  );
}

export default Login;
