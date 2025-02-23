import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import { useEffect } from "react";
import Spinner from "./Spinner";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { isLoading, user } = useUser();

  useEffect(() => {
    if (!isLoading && !user) navigate("/home");
  }, [isLoading, navigate, user]);

  if (isLoading)
    return (
      <div className="h-screen flex justify-center items-center">
        <Spinner size={60} borderWidth={6} />
      </div>
    );

  return children;
}

export default ProtectedRoute;
