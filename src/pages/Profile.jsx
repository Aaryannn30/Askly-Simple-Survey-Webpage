import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock, FaCamera, FaSave } from "react-icons/fa";

function Profile() {
  const [form, setForm] = useState({ email: "", username: "", password: "" })

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setForm({
      email: user.email || "",
      username: user.username || "",
      password: "",
    });
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-40 mix-blend-multiply filter blur-xl animate-blob1"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob3"></div>
      </div>

      <Sidebar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex-1 p-8 ml-64 relative z-10"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <motion.h1
              className="text-2xl font-bold flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <FaUser className="mr-3" />
              Your Profile
            </motion.h1>
          </div>

          {/* Main Content */}
          <div className="p-8">
            <form className="max-w-md mx-auto">
              {/* Profile Picture */}
              <motion.div
                className="relative w-32 h-32 mx-auto mb-6 group"
                whileHover={{ scale: 1.05 }}
              >
                <img
                  src="https://surveyprofilebucket.s3.ap-south-1.amazonaws.com/user.jpg"
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow-lg"
                />
              </motion.div>

              {/* Form Fields */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <Input
                  label="Email"
                  icon={<FaEnvelope className="text-gray-400" />}
                  value={form.email}
                  disabled
                />
                <Input
                  label="Username"
                  icon={<FaUser className="text-gray-400" />}
                  value={form.username}
                  disabled
                />
              </motion.div>
            </form>
          </div>
        </motion.div>
      </motion.div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes blob1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(20px, -20px) scale(1.05);
          }
        }
        @keyframes blob2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-15px, 15px) scale(1.05);
          }
        }
        @keyframes blob3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(10px, -10px) scale(1.05);
          }
        }
        .animate-blob1 {
          animation: blob1 8s ease-in-out infinite;
        }
        .animate-blob2 {
          animation: blob2 10s ease-in-out infinite;
        }
        .animate-blob3 {
          animation: blob3 12s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default Profile;
