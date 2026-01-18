import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/user-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    return res.json();
  };

  const { mutate } = useMutation({
    mutationFn: postData,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
        <button type="submit">Register</button>
      </form>
      <>
        <span>Already have an account yet ? </span>
        <NavLink to="/auth/user-login">Login</NavLink>
      </>
    </div>
  );
}
