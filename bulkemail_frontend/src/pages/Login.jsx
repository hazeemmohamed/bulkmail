import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from 'react'

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "https://bulkemail-backend.vercel.app/login",
        {
          username: email,
          password: password,
        }
      );

      if (res.data === true) {
        
        navigate("/home");
      } else {
        setError("Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-400 flex flex-col items-center">
      <h1 className="bg-blue-950 text-white p-4 text-xl md:text-3xl font-bold w-full text-center">
        BulkMail
      </h1>
      <h2 className="bg-blue-800 text-white p-3 md:text-xl w-full text-center">
        Login to your account
      </h2>

      <form
        onSubmit={handleLogin}
        className="bg-white mt-10 p-6 rounded-xl shadow-lg w-[90%] md:w-[400px]"
      >
        <h3 className="text-xl font-semibold text-center mb-6 text-blue-900">
          Sign In
        </h3>

        {error && (
          <p className="text-red-600 text-sm text-center mb-3">
            {error}
          </p>
        )}

        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     hover:bg-blue-700 transition disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          © {new Date().getFullYear()} BulkMail
        </p>
      </form>
    </div>
  );
}

export default Login;
