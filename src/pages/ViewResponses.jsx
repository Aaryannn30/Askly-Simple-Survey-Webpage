import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "./Header";
import { FaChartBar, FaAlignLeft, FaUser, FaArrowLeft } from "react-icons/fa";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ViewResponses() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSurveys =
      JSON.parse(localStorage.getItem("adminSurveys")) || [];
    const selectedSurvey = storedSurveys.find((s) => s.surveyID === id);

    if (!selectedSurvey) {
      Swal.fire({
        title: "No Data Found",
        text: "Redirecting back to admin panel...",
        icon: "info",
        backdrop: `
          rgba(0,0,0,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        navigate("/admin");
      });
    } else {
      setSurvey(selectedSurvey);
      setIsLoading(false);
    }
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const responseData = survey.responses || [];
  const questionData = survey.questions || [];

  // Processing MCQ and Likert responses for charting
  const chartData = questionData
    .filter((q) => q.type === "MCQ" || q.type === "Likert")
    .map((q) => {
      const responseCounts = {};
      responseData.forEach((res) => {
        const answer = res.answers[q.id];
        if (answer) {
          responseCounts[answer] = (responseCounts[answer] || 0) + 1;
        }
      });
      return {
        question: q.questionText,
        labels: Object.keys(responseCounts),
        data: Object.values(responseCounts),
      };
    });

  return (
    <div className="min-h-screen font-sans bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Background graphics */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 rounded-full bg-blue-100 opacity-40 mix-blend-multiply filter blur-xl animate-blob1"></div>
        <div className="absolute top-1/3 right-20 w-80 h-80 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob2"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-purple-100 opacity-30 mix-blend-multiply filter blur-xl animate-blob3"></div>
      </div>

      <Header />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 p-6 pt-20 max-w-6xl mx-auto"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {/* Header Section */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <motion.button
                  onClick={() => navigate("/admin")}
                  className="flex items-center text-blue-100 hover:text-white mb-2"
                  whileHover={{ x: -3 }}
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Admin Panel
                </motion.button>
                <motion.h1
                  className="text-2xl font-bold flex items-center"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  <FaChartBar className="mr-3" />
                  Survey Responses
                </motion.h1>
              </div>
              <motion.div
                className="bg-white/20 px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
              >
                <p className="font-medium">{responseData.length} Responses</p>
              </motion.div>
            </div>
            <motion.p
              className="mt-2 text-blue-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {survey.title}
            </motion.p>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Chart Section */}
            {chartData.map((data, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-8 shadow-inner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FaChartBar className="text-blue-500 mr-2" />
                  {data.question}
                </h2>
                <div className="h-80">
                  <Bar
                    data={{
                      labels: ["Count"],
                      datasets: [
                        {
                          label: "Responses",
                          data: data.data,
                          backgroundColor: "rgba(29, 78, 216, 0.7)",
                          borderColor: "rgba(29, 78, 216, 1)",
                          borderWidth: 2,
                          borderRadius: 4,
                          hoverBackgroundColor: "rgba(29, 78, 216, 0.9)",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: "top",
                          labels: {
                            font: {
                              size: 14,
                            },
                          },
                        },
                        tooltip: {
                          backgroundColor: "rgba(0,0,0,0.7)",
                          titleFont: {
                            size: 16,
                          },
                          bodyFont: {
                            size: 14,
                          },
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: "rgba(0,0,0,0.05)",
                          },
                        },
                        x: {
                          grid: {
                            display: false,
                          },
                        },
                      },
                    }}
                  />
                </div>
              </motion.div>
            ))}

            {/* Text Responses Section */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaAlignLeft className="text-blue-500 mr-2" />
                  Text Responses
                </h2>
              </div>
              <div className="divide-y divide-gray-200 max-h-96 overflow-y-auto">
                {responseData.length > 0 ? (
                  responseData.map((res, idx) => (
                    <motion.div
                      key={idx}
                      className="p-4 hover:bg-blue-50/50 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <div className="flex items-center mb-2">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <FaUser className="text-blue-600" />
                        </div>
                        <p className="font-bold text-gray-700">
                          User: {res.userID}
                        </p>
                      </div>
                      {questionData.map(
                        (q) =>
                          q.type === "Text" && (
                            <div key={q.id} className="ml-11 mb-3 last:mb-0">
                              <p className="font-medium text-gray-800 mb-1">
                                {q.questionText}
                              </p>
                              <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                {res.answers[q.id] || "No response"}
                              </p>
                            </div>
                          )
                      )}
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center text-gray-500">
                    No text responses available for this survey.
                  </div>
                )}
              </div>
            </motion.div>
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

export default ViewResponses;
