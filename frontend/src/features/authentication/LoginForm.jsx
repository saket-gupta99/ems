import { useState } from "react";
import { useLogin } from "./useLogin";
import Spinner from "../../ui/Spinner";
import { Link } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 m-2 w-full">
      <input
        type="text"
        id="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        disabled={isLoading}
        className="border border-gray-400 rounded-sm p-0.5 sm:p-1"
        placeholder="Enter email or employee id"
      />
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={isLoading}
        className="border border-gray-400 rounded-sm p-0.5 sm:p-1"
        placeholder="Enter password"
      />
      <Link to="/forgot-password" className="text-blue-700 text-right">
        Forgot Password?
      </Link>

      <button
        type="submit"
        disabled={isLoading}
        className="p-1 text-base xs:text-xl bg-black font-semibold text-white rounded-sm mt-3 hover:cursor-pointer hover:bg-gray-800"
      >
        {isLoading ? <Spinner size={28} /> : "Login"}
      </button>
    </form>
  );
}

export default LoginForm;
