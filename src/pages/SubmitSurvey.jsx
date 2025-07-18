import { useState } from "react";
import axios from "axios";
// import { endpoint } from "../API/config"; // Import API config

function SubmitSurvey() {
  const [surveyID, setSurveyID] = useState(""); // Survey ID (Input by user)
  // const [userID, setUserID] = useState("Aryan"); // Manually set userID (Replace with actual user data)
  const [answers, setAnswers] = useState([]); // Store answers
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        // `${endpoint}${survey.submitResponse}`, // API Endpoint
        // { surveyID, userID, answers }, // Request Body
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        setMessage("Survey submitted successfully!");
        console.log("Response ID:", response.data.responseID);
      } else {
        setMessage("Failed to submit survey.");
      }
    } catch (error) {
      console.error("Error submitting survey:", error.response?.data || error);
      setMessage("Error submitting survey.");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Submit Survey</h1>

      {/* Survey Input Fields */}
      <input
        type="text"
        placeholder="Survey ID"
        value={surveyID}
        onChange={(e) => setSurveyID(e.target.value)}
        className="border p-2 w-full mb-2"
      />

      <textarea
        placeholder="Enter answers (JSON format)"
        value={JSON.stringify(answers)}
        onChange={(e) => {
          try {
            setAnswers(JSON.parse(e.target.value));
          } catch {
            setMessage("Invalid JSON format.");
          }
        }}
        className="border p-2 w-full mb-2"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Submit Survey
      </button>

      {message && <p className="mt-4 text-lg">{message}</p>}
    </div>
  );
}

export default SubmitSurvey;
