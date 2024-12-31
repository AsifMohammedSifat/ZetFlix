"use client";

import { useState } from "react";
import { performLogin } from "@/app/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const LoginForm = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { setAuth } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/";
  const isValidRedirect = redirectTo?.startsWith("/") ? redirectTo : "/";

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      const loginResponse = await performLogin(formData);

      if (loginResponse.user) {
        setAuth(loginResponse.user);
        router.push(isValidRedirect);
      } else {
        setError(loginResponse.error);
      }
    } catch (err) {
      setError(err.message || "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form id="loginForm" className="space-y-4" onSubmit={onSubmit}>
      {/* Email input */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />

      {/* Password input */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
        required
      />

      {/* Error message display */}
      {error && <div className="text-red-500 text-sm">{error}</div>}

      {/* Submit button */}
      <button
        type="submit"
        className={`w-full ${
          loading ? "bg-green-400" : "bg-moviedb-red"
        } text-white py-3 rounded ${!loading && "hover:bg-red-700"} transition duration-300`}
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
};

export default LoginForm;
