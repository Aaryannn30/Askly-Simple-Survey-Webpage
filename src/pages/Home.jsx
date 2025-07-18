import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-300 min-h-screen font-sans relative overflow-hidden flex flex-col justify-between">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating circles */}
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-indigo-100 opacity-40 mix-blend-multiply filter blur-xl animate-float1"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-blue-100 opacity-30 mix-blend-multiply filter blur-xl animate-float2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-100 opacity-30 mix-blend-multiply filter blur-xl animate-float3"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-05"></div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-48 h-48 -mr-24 -mt-24 bg-indigo-200 rounded-full opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 -ml-32 -mb-32 bg-blue-200 rounded-full opacity-10"></div>
      </div>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20 px-4 relative z-10 min-h-full"
      >
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-5xl font-bold text-primary pb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Gather Insights Effortlessly
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
        >
          Create surveys, collect real-time responses, and unlock powerful
          analytics.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="w-full max-w-2xl mx-auto mb-8 relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-lg opacity-75 blur-lg"></div>
          <img
            src="https://surveyprofilebucket.s3.ap-south-1.amazonaws.com/Survey.jpg"
            alt="Survey Illustration"
            className="relative rounded-lg shadow-lg w-full border-4 border-white"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Now
          </Button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-8 px-6 text-center shadow-inner relative z-10">
        <div className="max-w-6xl mx-auto">
          <p className="text-lg">© 2025 Askly. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6 text-lg">
            <a
              href="/login"
              className="hover:text-indigo-200 text-white duration-100"
            >
              Login
            </a>
            <a
              href="/signup"
              className="hover:text-indigo-200 text-white duration-100"
            >
              Sign Up
            </a>
          </div>
        </div>
      </footer>

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }
        @keyframes float2 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(15px) rotate(-3deg);
          }
        }
        @keyframes float3 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(5deg);
          }
        }
        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }
        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }
        .animate-float3 {
          animation: float3 12s ease-in-out infinite;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(
            circle,
            rgba(99, 102, 241, 0.1) 1px,
            transparent 1px
          );
          background-size: 20px 20px;
        }
        .opacity-05 {
          opacity: 0.05;
        }
      `}</style>
    </div>
  );
}

export default Home;
