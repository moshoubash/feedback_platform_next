"use client";

import { register } from "@/api/users/route";
import { useState } from "react";

export default function RegisterPage() {
  const [errors, setErrors] = useState({});

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    const name = (e.currentTarget as HTMLFormElement).name.value;
    const email = (e.currentTarget as HTMLFormElement).email.value;
    const password = (e.currentTarget as HTMLFormElement).password.value;
    const passwordConfirmation = (e.currentTarget as HTMLFormElement)
      .password_confirmation.value;
    const response = await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });

    if (response.errors) {
      console.log(response.errors);
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
      <h1 className="text-3xl font-bold text-gray-600">Register</h1>
      <hr className="w-64 my-2" />
      {errors && (
        <>
          <p className="text-red-600 rounded-sm text-lg my-2 cursor-pointer">
            {errors?.name}
          </p>
          <p className="text-red-600 rounded-sm text-lg my-2 cursor-pointer">
            {errors?.email}
          </p>
          <p className="text-red-600 rounded-sm text-lg my-2 cursor-pointer">
            {errors?.password}
          </p>
        </>
      )}
      <form className="flex flex-col gap-2 w-64" onSubmit={handleRegister}>
        <div>
          <input
            className="text-gray-600 rounded-md p-2 border border-gray-600 text-lg my-2 px-2 cursor-pointer"
            name="name"
            type="text"
            placeholder="Name"
          />
        </div>
        <div>
          <input
            className="text-gray-600 rounded-md p-2 border border-gray-600 text-lg my-2 px-2 cursor-pointer"
            name="email"
            type="email"
            placeholder="Email"
          />
        </div>
        <div>
          <input
            className="text-gray-600 rounded-md p-2 border border-gray-600 text-lg my-2 px-2 cursor-pointer"
            name="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <input
            className="text-gray-600 rounded-md p-2 border border-gray-600 text-lg my-2 px-2 cursor-pointer"
            name="password_confirmation"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
        <button
          className="text-gray-600 bg-gray-200 hover:bg-gray-300 w-fit  rounded-md text-lg px-4 py-2 cursor-pointer"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
}
