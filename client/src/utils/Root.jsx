import { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const Root = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const role = user.role.toUpperCase();
      if (role === "ADMIN") navigate("/admin-dashboard");
      else if (role === "USER") navigate("/user-dashboard");
      else navigate("/signin");
    } else {
      navigate("/signin");
    }
  }, [user, navigate]);

  return null;
};

export default Root;
