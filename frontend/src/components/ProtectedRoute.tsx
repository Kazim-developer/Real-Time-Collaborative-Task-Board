import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/auth/status", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 200) {
          setAuthorized(true);
        } else {
          setAuthorized(false);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  if (!authorized) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
