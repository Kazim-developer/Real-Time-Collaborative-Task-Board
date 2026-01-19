import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitStatus, setSubmitStatus] = useState(false);
  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/user-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.json();
  };

  const getloggedStatus = async () => {
    const res = await fetch("http://localhost:3000/api/user-login");
    if (!res.ok) {
      throw new Error(`HTTP error, status code ${res.status}`);
    }
    const data = await res.json();
    return { data, status: res.status };
  };

  const { data } = useQuery({
    queryKey: ["user-login"],
    queryFn: getloggedStatus,
    enabled: submitStatus,
  });

  const { mutate } = useMutation({
    mutationFn: postData,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus(true);
    mutate();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          required
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <br />
        <button type="submit">Login</button>
      </form>
      <>
        <span>Don't have an account ? </span>
        <NavLink to="/auth/user-register">Register Now</NavLink>
      </>
    </div>
  );
}
