// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Input from "../components/Input";
// import Button from "../components/Button";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";
// import { FaCog, FaBell, FaSearch } from "react-icons/fa";
// import { endpoint, auth } from "../API/config";
// import Header from "./Header";

// function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setLoading(true);
//     setErrors({});

//     try {
//       const response = await axios.post(`${endpoint}${auth.login}`, {
//         username,
//         password,
//       });

//       const responseBody = response.data.body;
//       if (response.data.statusCode === 200) {
//         localStorage.setItem("accessToken", responseBody.AccessToken);
//         localStorage.setItem("userID", responseBody.username);
//         navigate("/dashboard");
//       } else {
//         setErrors({
//           apiError: response.data.message || "Login failed. Try again.",
//         });
//       }
//     } catch (error) {
//       setErrors({
//         apiError:
//           error.response?.data?.message ||
//           "An error occurred. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-slate-100 min-h-screen font-sans">
//       <Header />
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="flex items-center justify-center p-6 pt-20"
//       >
//         <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
//           <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">
//             Login
//           </h2>
//           {errors.apiError && (
//             <p className="text-center text-red-600 mb-4">{errors.apiError}</p>
//           )}
//           <form onSubmit={handleSubmit}>
//             <Input
//               label="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               error={errors.username}
//             />
//             <Input
//               label="Password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               error={errors.password}
//             />
//             <Button
//               type="submit"
//               className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white"
//               disabled={loading}
//             >
//               {loading ? "Logging in..." : "Login"}
//             </Button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Don’t have an account?{" "}
//             <a href="/signup" className="text-blue-700 hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { endpoint, auth } from "../API/config";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "./Header"; // ✅ Importing the updated Header

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Password visibility state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${endpoint}${auth.login}`, {
        username,
        password,
      });

      const responseBody = response.data.body;
      if (response.data.statusCode === 200) {
        localStorage.setItem("accessToken", responseBody.AccessToken);
        localStorage.setItem("userID", responseBody.username);
        navigate("/dashboard");
      } else {
        setErrors({ apiError: response.data.message || "Login failed. Try again." });
      }
    } catch (error) {
      setErrors({ apiError: error.response?.data?.message || "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <Header /> {/* ✅ Header added */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 mt-20" // ✅ Adjusted margin-top for header spacing
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Welcome Back</h2>
        {errors.apiError && <p className="text-center text-red-500 mb-4">{errors.apiError}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Field */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"} // 👁️ Toggle between text/password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {/* Eye Icon Button to Toggle Password Visibility */}
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;
