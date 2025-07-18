import { useState, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaArrowLeft, FaClipboardList } from "react-icons/fa";

function ShowSurvey() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [answeredSurveys, setAnsweredSurveys] = useState([]);
  const [userResponses, setUserResponses] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
    const storedResponses = JSON.parse(localStorage.getItem("answers")) || [];

    // Filter responses for the current user
    const userSurveyResponses = storedResponses.filter(
      (resp) => resp.userID === userID
    );

    // Extract answered survey IDs
    const answeredSurveyIds = userSurveyResponses.map((resp) => resp.surveyId);

    // Find matching surveys
    const answeredList = savedSurveys.filter((survey) =>
      answeredSurveyIds.includes(survey.surveyID)
    );

    setAnsweredSurveys(answeredList);

    // Map responses for easier access
    const responseMap = {};
    userSurveyResponses.forEach((resp) => {
      responseMap[resp.surveyId] = resp.answers;
    });

    setUserResponses(responseMap);
    setIsLoading(false);
  }, [userID]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-40 mix-blend-multiply filter blur-xl animate-blob1"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob3"></div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 pt-20 max-w-7xl mx-auto"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <motion.button
                onClick={() => navigate("/dashboard")}
                className="flex items-center text-blue-100 hover:text-white transition-colors"
                whileHover={{ x: -3 }}
              >
                <FaArrowLeft className="mr-2" />
                Back to Dashboard
              </motion.button>
              <motion.h1
                className="text-2xl font-bold flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaClipboardList className="mr-3" />
                Your Survey Responses
              </motion.h1>
              <div className="text-blue-100">
                {answeredSurveys.length} Survey
                {answeredSurveys.length !== 1 ? "s" : ""}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : answeredSurveys.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {answeredSurveys.map((survey) => (
                  <motion.div
                    key={survey.surveyID}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 mb-1">
                            {survey.title}
                          </h2>
                          <p className="text-gray-600 mb-4">
                            {survey.description}
                          </p>
                        </div>
                        <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          <FaCheckCircle className="mr-1" />
                          Completed
                        </div>
                      </div>

                      <div className="mt-4">
                        <h3 className="font-semibold text-gray-700 mb-3">
                          Your Responses:
                        </h3>
                        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                          <ul className="space-y-3">
                            {survey.questions.map((q) => (
                              <li
                                key={q.id}
                                className="pb-3 border-b border-gray-200 last:border-b-0"
                              >
                                <p className="font-medium text-gray-800 mb-1">
                                  {q.questionText}
                                </p>
                                <p className="text-blue-600 bg-blue-50 px-3 py-2 rounded inline-block">
                                  {userResponses[survey.surveyID]?.[q.id] ||
                                    "No response"}
                                </p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                className="text-center py-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <div className="max-w-md mx-auto">
                  <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <FaClipboardList className="text-blue-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700">
                    No answered surveys yet
                  </h3>
                  <p className="text-gray-500 mt-2 mb-6">
                    Your completed surveys will appear here
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                    onClick={() => navigate("/show-surveys")}
                  >
                    Browse Available Surveys
                  </motion.button>
                </div>
              </motion.div>
            )}
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

export default ShowSurvey;
