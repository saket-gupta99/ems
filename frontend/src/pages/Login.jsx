import { useState } from "react";
import LoginForm from "../features/authentication/LoginForm";
import { FaUserCircle } from "react-icons/fa";
import Register from "../features/authentication/Register";

function Login() {
  const [page, setPage] = useState("login");

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="relative flex justify-center gap-2 items-center flex-col p-4 shadow-2xl xs:p-8 sm:p-10 md:p-12 rounded-md">
        <div className="absolute top-0 flex justify-evenly w-full font-bold bg-black text-white divide-x rounded-t-md">
          <button
            onClick={() => setPage("login")}
            className="text-xl p-1 sm:p-4 cursor-pointer w-full"
          >
            Login
          </button>
          <button
            onClick={() => setPage("register")}
            className="text-xl p-1 sm:p-4 cursor-pointer w-full "
          >
            Register
          </button>
        </div>

        <FaUserCircle className="h-18 w-18 xs:h-22 xs:w-22 sm:h-26 sm:w-26 md:h-32 md:w-32 lg:h-36 mt-10 lg:w-36" />
        <h1 className="text-2xl xs:text-3xl md:text-3xl font-semibold text-center">
          {page === "login" ? "Login to your account" : "Register your account"}
        </h1>
        {page === "login" ? <LoginForm /> : <Register />}
      </div>
    </div>
  );
}

export default Login;
