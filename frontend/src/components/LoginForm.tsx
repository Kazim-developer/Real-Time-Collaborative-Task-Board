import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [warning, setWarning] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/user-login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "request faiiled");
    }

    return data;
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

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <h1 className="text-2xl font-[600] text-center pb-[1em]">
          Login to proceed
        </h1>

        <input
          type="text"
          placeholder="Enter your email"
          required
          className="outline-none w-[100%] mb-[1em]"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          ref={inputRef}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          required
          className="outline-none w-[100%] mb-[1em]"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <br />
        {warning && (
          <p className={clsx("message text-red-600", warning && "mb-[1em]")}>
            Email or password is incorrect
          </p>
        )}
        <button
          type="submit"
          className={clsx(
            "bg-[#23e32f] w-[100%] pt-[0.5em] pb-[0.5em] rounded-[10px] font-[600] inline-block cursor-pointer active:scale-[0.95]",
          )}
        >
          Login
        </button>
      </form>
      <div className={clsx("pt-[1em]")}>
        <span>Don't have an account ? </span>
        <NavLink to="/auth/user-register" className={clsx("text-blue-600")}>
          Register Now
        </NavLink>
      </div>
    </div>
  );
}
