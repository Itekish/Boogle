import { useLogin } from "./hook/useLogin";
import { motion } from "framer-motion"; // For smooth animations
import { Link } from "react-router-dom";

const Login = () => {
  const { formData, errorMessage, handleChange, handleSubmit } = useLogin();

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#121212] overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#ff4d6d] rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff9f43] rounded-full opacity-30 blur-3xl"></div>
      </div>

      {/* Glassmorphism Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-lg p-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl"
      >
        {/* Boogle Logo */}
        <div className="flex justify-center mb-6">
          <img src="/boogle.png" alt="Boogle Logo" className="h-16" />
        </div>

        <h1 className="text-4xl font-extrabold text-center text-white">
          Welcome Back to <span className="text-[#ff4d6d]">Boogle!</span>
        </h1>
        <p className="text-gray-300 text-lg text-center mb-8">
          Manage events like a pro.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-300 text-lg font-semibold">
              Email
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-600 bg-transparent text-white rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] placeholder-gray-400"
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-300 text-lg font-semibold">
              Password
            </label>
            <input
              className="w-full px-5 py-3 border border-gray-600 bg-transparent text-white rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-[#ff4d6d] placeholder-gray-400"
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Login Button with Glow Effect */}
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 15px rgba(255, 77, 109, 0.8)",
            }}
            className="w-full bg-gradient-to-r from-[#ff4d6d] to-[#ff9f43] text-white font-bold text-lg py-3 rounded-md transition-all duration-300"
            type="submit"
          >
            Sign In
          </motion.button>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-400 text-md text-center mt-2">
              {errorMessage}
            </p>
          )}

          {/* Signup Link */}
          <p className="text-gray-300 text-md text-center mt-6">
            New to Boogle?{" "}
            <Link to="/auth" className="text-[#ff4d6d] font-bold hover:underline">
              Create an account
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
