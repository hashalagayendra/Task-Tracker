import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

function Signup() {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function registerUser() {
    try {
      return await axios.post("/user", formData);
    } catch (e: any) {
      console.log(e);
      throw e.response?.data?.message || "Registration failed";
    }
  }

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.promise(
      registerUser().then(() => {
        setTimeout(() => navigate("/login"), 1000);
      }),
      {
        loading: "Creating account...",
        success: <b>Account created successfully!</b>,
        error: (err) => <b>{err.toString()}</b>,
      },
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-color)]">
      <div className="w-full max-w-md p-8 bg-[var(--card-bg)] rounded-2xl border border-[var(--border-color)]">
        <h1 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-2">
          Create Account
        </h1>
        <p className="text-[var(--text-secondary)] text-center mb-8">
          Sign up to get started
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full px-4 py-3 bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
              required
            />
          </div>

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
              placeholder="Create a password"
              className="w-full px-4 py-3 bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="w-full px-4 py-3 bg-[var(--sidebar-bg)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--accent-blue)] transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[var(--accent-blue)] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity mt-6"
          >
            Sign Up
          </button>
        </form>

        <p className="text-[var(--text-secondary)] text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[var(--accent-blue)] hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
