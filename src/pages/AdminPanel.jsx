import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaChartBar, FaPlus } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "./Header";
import { admin, endpoint } from "../API/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminPanel() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const adminID = localStorage.getItem("userID");
        if (!adminID) return;

        const response = await axios.post(
          `${endpoint}${admin.getAllSurveyResponses}`,
          { adminID: adminID }
        );

        const surveys = response.data?.body?.surveys || [];
        setSurveys(surveys);
        localStorage.setItem("adminSurveys", JSON.stringify(surveys));
      } catch (error) {
        console.error("Error fetching survey responses:", error);
        setSurveys([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSurveyResponses();
  }, []);

  const chartData = {
    labels: surveys.map((s) => s.title),
    datasets: [
      {
        label: "Responses",
        data: surveys.map((s) => s.responses.length),
        backgroundColor: "rgba(29, 78, 216, 0.7)",
        borderColor: "rgba(29, 78, 216, 1)",
        borderWidth: 2,
        borderRadius: 4,
        hoverBackgroundColor: "rgba(29, 78, 216, 0.9)",
      },
    ],
  };

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
        className="relative z-10 p-6 pt-20 max-w-7xl mx-auto"
      >
        <motion.div
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 overflow-hidden"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
        >
          {/* Panel Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <div className="flex justify-between items-center">
              <motion.h1
                className="text-3xl font-bold flex items-center"
                initial={{ x: -10 }}
                animate={{ x: 0 }}
              >
                <FaChartBar className="mr-3" />
                Admin Dashboard
              </motion.h1>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => navigate("/admin/create-survey")}
                  className="bg-blue-500 hover:bg-blue-300 hover:text-black shadow-lg flex items-center"
                >
                  <FaPlus className="mr-2" />
                  Create New Survey
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {/* Analytics Section */}
            <motion.div
              className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 mb-8 shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaChartBar className="text-blue-500 mr-2" />
                Survey Analytics
              </h2>
              <div className="h-80">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : (
                  <Bar
                    data={chartData}
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
                )}
              </div>
            </motion.div>

            {/* Surveys Table */}
            <motion.div
              className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-50 to-indigo-50">
                    <tr>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Title
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Status
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Responses
                      </th>
                      <th className="p-4 text-left text-gray-700 font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {isLoading ? (
                      <tr>
                        <td colSpan="4" className="p-8 text-center">
                          <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                          </div>
                        </td>
                      </tr>
                    ) : surveys.length > 0 ? (
                      surveys.map((survey) => (
                        <motion.tr
                          key={survey.surveyID}
                          className="hover:bg-blue-50/50 transition-colors"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <td className="p-4 text-gray-800 font-medium">
                            {survey.title}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                survey.responses.length > 0
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {survey.responses.length > 0
                                ? "Active"
                                : "Inactive"}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="font-medium">
                              {survey.responses.length}
                            </span>{" "}
                            responses
                          </td>
                          <td className="p-4">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button
                                variant="outline"
                                onClick={() =>
                                  navigate(`/admin/survey/${survey.surveyID}`)
                                }
                                className="bg-blue-500 hover:bg-blue-300 hover:text-black"
                              >
                                View Responses
                              </Button>
                            </motion.div>
                          </td>
                        </motion.tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="4"
                          className="p-8 text-center text-gray-500"
                        >
                          No surveys found. Create your first survey to get
                          started.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
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

export default AdminPanel;
