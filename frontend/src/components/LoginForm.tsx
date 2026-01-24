import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [warning, setWarning] = useState(false);
  const navigate = useNavigate();
  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/user-login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      setWarning(true);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1>Login to proceed</h1>
        {warning && <p className="message">Email or password is incorrect</p>}
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
        <button type="submit" className={clsx("bg-[#23d32f]")}>
          Login
        </button>
      </form>
      <>
        <span>Don't have an account ? </span>
        <NavLink to="/auth/user-register" className={clsx("text-blue-600")}>
          Register Now
        </NavLink>
      </>
    </div>
  );
}
