import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaCog, FaBell, FaSearch } from "react-icons/fa";
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
  const isLoggedIn = !!localStorage.getItem("token");
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveyResponses = async () => {
      try {
        const adminID = localStorage.getItem("userID");
        if (!adminID) return;

        const response = await axios.post(
          "https://bcukdw29le.execute-api.ap-south-1.amazonaws.com/dev/admin/getAllSurveyResponses",
          { adminID: adminID }
        );

        const surveys = response.data?.body?.surveys || []; // Safe access
        setSurveys(surveys);
        localStorage.setItem("adminSurveys", JSON.stringify(surveys));
      } catch (error) {
        console.error("Error fetching survey responses:", error);
        setSurveys([]); // Prevents blank page due to undefined surveys
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
        backgroundColor: "#1D4ED8",
        borderColor: "#1D4ED8",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 pt-20"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">Admin Panel</h1>
            <Button
              onClick={() => navigate("/admin/create-survey")}
              className="bg-blue-700 hover:bg-blue-800 text-white"
            >
              Create New Survey
            </Button>
          </div>
          <div className="bg-slate-50 p-6 rounded-lg mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Survey Analytics
            </h2>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: { legend: { position: "top" } },
              }}
            />
          </div>
          <div className="bg-slate-50 p-6 rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="p-4">Title</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Responses</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {surveys.map((survey) => (
                  <tr
                    key={survey.surveyID}
                    className="border-t hover:bg-slate-100"
                  >
                    <td className="p-4 text-gray-800">{survey.title}</td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          survey.responses.length > 0
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-yellow-700"
                        }`}
                      >
                        {survey.responses.length > 0 ? "Active" : "Unactive"}
                      </span>
                    </td>
                    <td className="p-4 text-gray-800">
                      {survey.responses.length}
                    </td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        onClick={() =>
                          navigate(`/admin/survey/${survey.surveyID}`)
                        }
                        className="border-blue-700 text-blue-700 hover:bg-blue-50"
                      >
                        View Responses
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AdminPanel;


