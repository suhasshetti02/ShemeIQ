"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (user.password !== user.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      // Replace with your backend API call
      // Example:
      // const res = await api.post("/auth/signup", user);
      console.log(user);
      alert("Account created successfully!");
    } catch (err) {
      setError("Failed to create account");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-black transition-colors px-4">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-900 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-primary dark:text-white mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSignUp} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-black dark:border-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-black dark:border-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-black dark:border-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={user.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded dark:bg-black dark:border-gray-700 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-accent"
          />

          {error && <p className="text-red-500">{error}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
          Already have an account?{" "}
          <Link href="/signin" className="text-accent hover:underline">
            Sign In
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
