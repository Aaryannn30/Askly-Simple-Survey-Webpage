import { useState, useEffect } from "react";
import axios from "axios";
import { endpoint, admin } from "../API/config";

function SurveyResponses() {
  const adminID = "Admin123"; // Hardcoded for now, replace with actual admin logic
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await axios.post(`${endpoint}${admin.getAllSurveyResponses}`, { adminID });
        if (response.data.surveys) {
          setSurveys(response.data.surveys);
        } else {
          setSurveys([]);
        }
      } catch (error) {
        console.error("Error fetching survey responses:", error);
      }
      setLoading(false);
    };

    fetchResponses();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold mb-4">Survey Responses</h1>
      {loading ? (
        <p>Loading...</p>
      ) : surveys.length === 0 ? (
        <p>No surveys found.</p>
      ) : (
        surveys.map((survey) => (
          <div key={survey.surveyID} className="border p-4 mb-4 rounded">
            <h2 className="text-xl font-semibold">{survey.title}</h2>
            <p>{survey.description}</p>
            <p className="text-gray-500 text-sm">Created on: {new Date(survey.createdAt).toLocaleString()}</p>
            
            <h3 className="mt-3 font-medium">Responses:</h3>
            {survey.responses.length > 0 ? (
              <ul className="mt-2">
                {survey.responses.map((response, index) => (
                  <li key={index} className="p-2 border-b">
                    <p className="text-sm text-gray-600">User: {response.userID}</p>
                    <p className="text-sm text-gray-600">Submitted: {new Date(response.submittedAt).toLocaleString()}</p>
                    <p className="text-sm text-gray-600">Answers:</p>
                    <ul className="ml-4 text-sm">
                      {response.answers.map((answer, idx) => (
                        <li key={idx}>• {JSON.stringify(answer)}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No responses yet.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default SurveyResponses;
