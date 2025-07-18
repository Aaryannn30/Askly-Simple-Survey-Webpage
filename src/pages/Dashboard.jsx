import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCog, FaBell, FaSearch } from "react-icons/fa";
import SurveyCard from "../components/SurveyCard";
import { endpoint, user } from "../API/config";
import Header from "./Header";

function Dashboard() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const userID = localStorage.getItem("userID");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.post(`${endpoint}${user.getAllSurvey}`, {
          userID,
        });

        if (response.data.statusCode === 200) {
          setSurveys(response.data.body);
          localStorage.setItem("surveys", JSON.stringify(response.data.body));
        } else {
          console.error("Error fetching surveys:", response.data.body.error);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error.response || error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveys();
  }, [userID]);

  return (
    <div className="min-h-screen font-sans relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-40 mix-blend-multiply filter blur-xl animate-blob1"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob3"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48cGF0aCBkPSJNMCAwaDQwdjQwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTIwIDB2NDBNMCAyMGg0MCIgc3Ryb2tlPSJyZ2JhKDEwMCwxMTYsMjAwLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      </div>

      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 pt-16 max-w-7xl mx-auto"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {/* Decorative header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
            <motion.h1
              className="text-3xl font-bold mb-2"
              initial={{ x: -10 }}
              animate={{ x: 0 }}
            >
              All Surveys
            </motion.h1>
            <motion.p
              className="text-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome back,{" "}
              <span className="font-semibold text-white">{userID}</span>!
            </motion.p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="p-6">
              {surveys.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  {surveys.map((survey) => (
                    <SurveyCard
                      key={survey.surveyID}
                      title={survey.title}
                      description={survey.description}
                      onClick={() => navigate(`/survey/${survey.surveyID}`)}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="max-w-md mx-auto">
                    <svg
                      className="w-24 h-24 mx-auto text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-medium text-gray-700">
                      No surveys available
                    </h3>
                    <p className="mt-1 text-gray-500">
                      Create your first survey to get started
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                      onClick={() => navigate("/create-survey")}
                    >
                      Create Survey
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
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

export default Dashboard;
