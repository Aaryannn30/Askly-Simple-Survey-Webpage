// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import Input from "../components/Input";
// import Button from "../components/Button";
// import { motion } from "framer-motion";
// import { FaCog, FaBell, FaSearch } from "react-icons/fa";
// import { endpoint, auth } from "../API/config";
// import Header from "./Header";

// function Signup() {
//   const [form, setForm] = useState({
//     fullName: "",
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [success, setSuccess] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const isLoggedIn = !!localStorage.getItem("token");

//   const validate = () => {
//     const newErrors = {};
//     if (!form.fullName) newErrors.fullName = "Full Name is required";
//     if (!form.username) newErrors.username = "Username is required";
//     if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) newErrors.email = "Invalid email format";
//     if (form.password.length < 8 || !/[!@#$%^&*]/.test(form.password) || !/\d/.test(form.password))
//       newErrors.password = "Password must be 8+ chars with a number and special char";
//     if (form.password !== form.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
  
//     setLoading(true);
//     setErrors({});
//     setSuccess("");
  
//     try {
//       console.log("Sending request to:", `${endpoint}/${auth.signUp}`);
//       console.log("Payload:", {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//       });
  
//       const response = await axios.post(`${endpoint}/${auth.signUp}`, {
//         username: form.username,
//         email: form.email,
//         password: form.password,
//       });
  
//       console.log("API Response:", response.data);
//       const responseData = response.data.body || response.data;
  
//       if (response.data.statusCode === 201) {
//         localStorage.setItem("pendingUsername", form.username); // Store username temporarily
//         navigate("/confirm"); // Redirect to confirmation page
          
//       } else {
//         console.log("API Error Message:", responseData.message); // Log exact API message
//         setErrors({ apiError: responseData.message || "Signup failed. Try again." });
//       }
//     } catch (error) {
//       console.error("Signup Error:", error);
//       setErrors({ apiError: error.response?.data?.message || "An error occurred. Please try again." });
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
//           <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">Sign Up</h2>
//           {success && <p className="text-center text-green-600 mb-4">{success}</p>}
//           {errors.apiError && <p className="text-center text-red-600 mb-4">{errors.apiError}</p>}
//           <form onSubmit={handleSubmit}>
//             <Input
//               label="Full Name"
//               value={form.fullName}
//               onChange={(e) => setForm({ ...form, fullName: e.target.value })}
//               error={errors.fullName}
//             />
//             <Input
//               label="Username"
//               value={form.username}
//               onChange={(e) => setForm({ ...form, username: e.target.value })}
//               error={errors.username}
//             />
//             <Input
//               label="Email"
//               value={form.email}
//               onChange={(e) => setForm({ ...form, email: e.target.value })}
//               error={errors.email}
//             />
//             <Input
//               label="Password"
//               type="password"
//               value={form.password}
//               onChange={(e) => setForm({ ...form, password: e.target.value })}
//               error={errors.password}
//             />
//             <Input
//               label="Confirm Password"
//               type="password"
//               value={form.confirmPassword}
//               onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//               error={errors.confirmPassword}
//             />
//             <Button type="submit" className="w-full mt-6 bg-blue-700 hover:bg-blue-800 text-white" disabled={loading || !Object.values(form).every(Boolean)}>
//               {loading ? "Signing Up..." : "Sign Up"}
//             </Button>
//           </form>
//           <p className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <a href="/login" className="text-blue-700 hover:underline">
//               Login
//             </a>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Signup;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { endpoint, auth } from "../API/config";
import Header from "./Header";

function Signup() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!form.fullName) newErrors.fullName = "Full Name is required";
    if (!form.username) newErrors.username = "Username is required";
    if (!form.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/))
      newErrors.email = "Invalid email format";
    if (form.password.length < 8 || !/[!@#$%^&*]/.test(form.password) || !/\d/.test(form.password))
      newErrors.password = "Password must be 8+ chars with a number and special char";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await axios.post(`${endpoint}/${auth.signUp}`, {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      if (response.data.statusCode === 201) {
        localStorage.setItem("pendingUsername", form.username);
        navigate("/confirm");
      } else {
        setErrors({ apiError: response.data.message || "Signup failed. Try again." });
      }
    } catch (error) {
      setErrors({ apiError: error.response?.data?.message || "An error occurred. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white bg-opacity-80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-200 mt-20"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">Create an Account</h2>
        {errors.apiError && <p className="text-center text-red-500 mb-4">{errors.apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
          </div>

          {/* Username */}
          <div className="relative">
            <FaUser className="absolute left-4 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full pl-12 pr-12 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-blue-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <FaLock className="absolute left-4 top-3 text-gray-500" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full pl-12 pr-12 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="button"
              className="absolute right-4 top-3 text-gray-500 hover:text-blue-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition duration-300 shadow-md"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline font-medium">
            Login
          </a>
        </p>
      </motion.div>
    </div>
  );
}

export default Signup;
