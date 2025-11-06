import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({ children, requireRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/signin");
      setLoading(false);
      return;
    }

    if (!requireRole.includes(user.role.toUpperCase())) {
      navigate("/unauthorized");
      setLoading(false);
      return;
    }

    setLoading(false);
  }, [user, navigate, requireRole]);

  if (loading) return <p>Loading...</p>;
  if (!user || !requireRole.includes(user.role.toUpperCase())) return null;

  return children;
};

export default ProtectedRoutes;
