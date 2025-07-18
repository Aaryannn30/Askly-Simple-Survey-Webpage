import { useParams } from "react-router-dom";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function SurveySummary() {
  const { id } = useParams();
  const responses = JSON.parse(localStorage.getItem(`survey-${id}-responses`) || "{}");

  const handleSubmit = () => {
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8 ml-64 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Survey Summary (ID: {id})</h1>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Responses</h2>
          <ul className="space-y-2">
            {Object.entries(responses).map(([qId, answer]) => (
              <li key={qId} className="text-gray-700">
                <strong>Q{qId}:</strong> {answer}
              </li>
            ))}
          </ul>
          <Button onClick={handleSubmit} className="mt-6 bg-primary hover:bg-indigo-700">
            Confirm & Submit
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default SurveySummary;