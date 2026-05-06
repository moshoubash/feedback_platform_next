"use client";

import { login } from "@/api/users/route";
import { useState } from "react";

export default function LoginPage() {
  const [error, setError] = useState(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;
    const response = await login({ email, password });
    console.log(response);
    if (response.message) {
      setError(response.message);
      return;
    }
    window.location.href = "/";
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-600">Login</h1>
      <hr className="w-64 my-2" />
      <form className="flex flex-col gap-2 w-64" onSubmit={handleLogin}>
        {/* error messages if any */}
        {error && (
          <div className="text-red-600 bg-red-200 hover:bg-red-300 rounded-md text-lg my-2 px-2 cursor-pointer">
            {error}
          </div>
        )}

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
          onClick={async (e) => {
            e.preventDefault();
            const email = (e.currentTarget.parentNode as HTMLFormElement).email
              .value;
            const password = (e.currentTarget.parentNode as HTMLFormElement)
              .password.value;
            await login({ email, password });
          }}
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
}
