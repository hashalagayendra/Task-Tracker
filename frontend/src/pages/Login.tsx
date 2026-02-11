import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function loginUser() {
    try {
      const response = await axios.post("/user/login", formData);
      return response.data;
    } catch (e: any) {
      console.log(e);
      throw e.response?.data?.message || "Login failed";
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.promise(
      loginUser().then(() => {
        // Redirect after successful login
        // Optional: you might want to fetch user profile here or let a context handle it
        setTimeout(() => navigate("/dashboard"), 1000);
      }),
      {
        loading: "Logging in...",
        success: <b>Login successful!</b>,
        error: (err) => <b>{err.toString()}</b>,
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
      <div className="w-full max-w-md p-8 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-2">
          Welcome Back
        </h1>
        <p className="text-[var(--text-secondary)] text-center mb-8">
          Log in to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--accent-blue)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6"
          >
            Log In
          </button>
        </form>

        <p className="text-[var(--text-secondary)] text-center mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-[var(--accent-blue)] hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
