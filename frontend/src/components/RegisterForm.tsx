import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { NavLink, useNavigate } from "react-router-dom";
import clsx from "clsx";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [info, setInfo] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const postData = async () => {
    const res = await fetch("http://localhost:3000/api/user-register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "request failed");
    }

    return data;
  };

  const { mutate } = useMutation({
    mutationFn: postData,
    onSuccess: () => {
      navigate("/auth/user-login");
    },
    onError: () => {
      setInfo(true);
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
          Register your account
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
        {info && (
          <p className={clsx("message text-red-600", info && "mb-[1em]")}>
            Email already exists, choose another or login
          </p>
        )}
        <button
          type="submit"
          className={clsx(
            "bg-[#12d3f4] w-[100%] pt-[0.5em] pb-[0.5em] cursor-pointer rounded-[10px] font-[600] inline-block active:scale-[0.95]",
          )}
        >
          Register
        </button>
      </form>
      <div className={clsx("pt-[1em]")}>
        <span>Already have an account yet ? </span>
        <NavLink to="/auth/user-login" className={clsx("text-blue-600")}>
          Login
        </NavLink>
      </div>
    </div>
  );
}
