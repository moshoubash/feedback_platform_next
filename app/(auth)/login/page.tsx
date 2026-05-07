"use client";

import { login } from "@/api/users/route";
import { useState } from "react";

export default function LoginPage() {
  const [errors, setErrors] = useState({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;
    const response = await login({ email, password });

    if (response.errors) {
      setErrors(response.errors);
    }

    if (response.success) {
      window.location.href = "/";
    } else {
      setErrors(response.errors);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-600">Login</h1>
      <hr className="w-64 my-2" />
      {errors && (
        <>
          <p className="text-red-600 rounded-sm text-lg my-2 cursor-pointer">
            {errors?.email}
          </p>
          <p className="text-red-600 rounded-sm text-lg my-2 cursor-pointer">
            {errors?.password}
          </p>
        </>
      )}

      <form className="flex flex-col gap-2 w-64" onSubmit={handleLogin}>
        <input
          className="text-gray-600 rounded-md p-2 border border-gray-600 text-lg my-2 px-2 cursor-pointer"
          name="email"
          type="text"
          placeholder="Email"
        />
        <input
          className="text-gray-600 rounded-md p-2 border border-gray-600 text-lg my-2 px-2 cursor-pointer"
          name="password"
          type="password"
          placeholder="Password"
        />
        <button
          className="text-gray-600 bg-gray-200 hover:bg-gray-300 w-fit  rounded-md text-lg px-4 py-2 cursor-pointer"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
