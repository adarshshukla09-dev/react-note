import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../api/User.js";
import { useAuth } from "../context/UserContext.jsx";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login({ email, password });

    if (!result.ok) {
      toast.error(result.message || "❌ Login failed");
      setLoading(false);
      return;
    }

    toast.success("🎉 Logged in successfully!");
    navigate("/");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8F9FB] font-inter p-4">
      <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-2xl transition-all duration-300">
        <h2 className="text-3xl font-bold text-[#1A1A1A] mb-2 text-center">
          Welcome Back
        </h2>
        <p className="text-[#666666] mb-8 text-center">
          Log in to continue organizing your ideas.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-[#E4E4E4] rounded-lg bg-gray-50 shadow-sm"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#1A1A1A] mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-[#E4E4E4] rounded-lg bg-gray-50 shadow-sm"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#4B65F6] text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-[#666666]">
          Don't have an account yet?{" "}
          <Link className="text-indigo-600 font-semibold" to="/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
