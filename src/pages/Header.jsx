import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { endpoint, user } from "../API/config";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Header = () => {
  const isLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const location = useLocation();
  const isDashboard = location.pathname === "/dashboard";
  const isAdmin = location.pathname === "/admin";

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      await axios.post(`${endpoint}${user.logout}`, { body: { accessToken } });

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userID");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 shadow-sm backdrop-blur-lg py-4 px-6 sticky top-0 z-50 border-b border-white/20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-blue-200/20 rounded-full filter blur-xl"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 -ml-20 -mb-20 bg-indigo-200/20 rounded-full filter blur-xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo with animation */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-md">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
          </div>
          <motion.h1
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-wide"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            Askly
          </motion.h1>
        </motion.div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <motion.a
            href="/dashboard"
            className={`text-gray-700 font-medium transition-colors ${
              isDashboard
                ? "opacity-50 cursor-not-allowed"
                : "hover:text-blue-600"
            }`}
            whileHover={{ y: isDashboard ? 0 : -2 }}
            aria-disabled={isDashboard}
            onClick={(e) => isDashboard && e.preventDefault()}
          >
            Dashboard
          </motion.a>

          <motion.a
            href="/admin"
            className={`text-gray-700 font-medium transition-colors ${
              isAdmin ? "opacity-50 cursor-not-allowed" : "hover:text-blue-600"
            }`}
            whileHover={{ y: isAdmin ? 0 : -2 }}
            aria-disabled={isAdmin}
            onClick={(e) => isAdmin && e.preventDefault()}
          >
            Admin Panel
          </motion.a>
        </nav>

        {/* Icons & Actions */}
        <div className="flex items-center space-x-4">
          {/* Authentication Actions */}
          {isLoggedIn ? (
            <motion.div
              className="flex items-center space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 overflow-hidden border-2 border-white shadow-md">
                  <img
                    src="https://surveyprofilebucket.s3.ap-south-1.amazonaws.com/user.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
              <motion.button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg text-sm hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              className="flex space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.button
                onClick={() => navigate("/login")}
                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Login
              </motion.button>
              <motion.button
                onClick={() => navigate("/signup")}
                className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition-all shadow-sm hover:shadow-md"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
