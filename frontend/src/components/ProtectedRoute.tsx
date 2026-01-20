import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const getloggedStatus = async () => {
  const res = await fetch("http://localhost:3000/api/me", {
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`HTTP error, status code ${res.status}`);
  }
  return res.json();
};

export default function ProtectedRoute({ children }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["auth"],
    queryFn: getloggedStatus,
  });

  if (isLoading) return <p>Checking authentication ...</p>;
  console.log(data);

  if (isError || !data?.authenticated) {
    return <Navigate to="/auth/user-login" replace />;
  }

  return children;
}
