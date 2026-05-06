"use client";

import Link from "next/link";
import { logout, userProfile } from "@/api/users/route";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      setIsAuthenticated(true);
      userProfile().then((user: string | null) => {
        if (user) {
          setUserName(JSON.parse(user || "{}")["user"].email);
        }
      });
    }
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <div className="flex items-center justify-between gap-2 bg-gray-600 p-2">
      <div className="text-2xl font-bold text-white">
        <Link href="/">Feedback platform</Link>
      </div>
      <div className="flex items-center gap-2">
        {isAuthenticated ? (
          <>
            <p className="text-white text-lg my-2">Hello, {userName}</p>
            <button
              onClick={handleLogout}
              className="text-red-600 bg-red-200 hover:bg-red-300 transition-all duration-200 rounded-md text-lg my-2 px-2 cursor-pointer"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-gray-600 bg-gray-200 hover:bg-gray-300 transition-all duration-200 rounded-md text-lg my-2 px-2 cursor-pointer"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-gray-600 bg-gray-200 hover:bg-gray-300 transition-all duration-200 rounded-md text-lg my-2 px-2 cursor-pointer"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
