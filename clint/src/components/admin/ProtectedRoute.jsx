import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const naviget = useNavigate();
  useEffect(() => {
    if (user === null || user?.role !== "recruiter") {
      naviget("/");
    }
  }, []);

  return <>{children} </>;
};

export default ProtectedRoute;
