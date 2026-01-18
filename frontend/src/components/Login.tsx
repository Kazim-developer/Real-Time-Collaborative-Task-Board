import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/user-login", {
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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your email"
        required
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />

      <input
        type="password"
        placeholder="Enter your password"
        required
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
      />

      <button type="submit">Login</button>
    </form>
  );
}
