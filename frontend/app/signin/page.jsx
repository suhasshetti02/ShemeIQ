"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Replace with your backend API call
      // Example:
      // const res = await api.post("/auth/signin", { email, password });
      console.log({ email, password });
      alert("Signed in successfully!");
    } catch (err) {
      setError("Invalid email or password");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/5 dark:bg-black transition-colors px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-white/5 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary dark:text-white mb-6">
          Sign In
        </h2>

        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border rounded dark:bg-black dark:border-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border rounded dark:bg-black dark:border-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Don't have an account?{" "}
          <Link href="/signup" className="text-accent hover:underline">
            Sign Up
          </Link>
        </p>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-2">
          <Link href="/" className="hover:underline">
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}
