import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint, admin } from "../API/config"; // Import API config
import { useNavigate } from "react-router-dom";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Get user from local storage (handle potential parsing errors)
  const userID = localStorage.getItem("userID");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (!userID || !accessToken || userID === "") {
      navigate("/login");
    }
  }, []);

  const addQuestion = () => {
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: `q${prevQuestions.length + 1}`,
        type: "Text",
        questionText: "",
        options: [],
        required: false,
      },
    ]);
  };

  const handleQuestionChange = (index, field, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index][field] = value;
      return updatedQuestions;
    });
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[qIndex].options[oIndex] = value;
      return updatedQuestions;
    });
  };

  const addOption = (index) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index].options.push("");
      return updatedQuestions;
    });
  };

  const removeQuestion = (index) => {
    setQuestions((prevQuestions) =>
      prevQuestions.filter((_, i) => i !== index)
    );
  };

  const submitSurvey = async () => {
    if (!title.trim()) return setMessage("Survey title is required!");
    if (questions.length === 0)
      return setMessage("At least one question is required!");

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(`${endpoint}${admin.createSurvey}`, {
        adminID: userID,
        title,
        description,
        questions,
      });

      setMessage(response.data.message || "Survey created successfully!");
      setTitle("");
      setDescription("");
      setQuestions([]);
    } catch (error) {
      console.error("Survey Creation Error:", error);
      setMessage("Error creating survey. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold mb-4">Create a Survey</h2>

      {message && (
        <div
          className={`mb-4 ${
            message.includes("Error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </div>
      )}

      <input
        type="text"
        placeholder="Survey Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <textarea
        placeholder="Survey Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />

      <button
        onClick={addQuestion}
        className="bg-blue-500 text-white p-2 rounded mb-4"
      >
        + Add Question
      </button>

      {questions.map((q, qIndex) => (
        <div key={q.id} className="mb-4 p-4 border rounded bg-gray-100">
          <input
            type="text"
            placeholder="Question Text"
            value={q.questionText}
            onChange={(e) =>
              handleQuestionChange(qIndex, "questionText", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          />

          <select
            value={q.type}
            onChange={(e) =>
              handleQuestionChange(qIndex, "type", e.target.value)
            }
            className="w-full p-2 border rounded mb-2"
          >
            <option value="Text">Text</option>
            <option value="MCQ">Multiple Choice</option>
            <option value="Likert">Likert Scale</option>
          </select>

          {q.type === "MCQ" && (
            <div>
              {q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  placeholder={`Option ${oIndex + 1}`}
                  value={opt}
                  onChange={(e) =>
                    handleOptionChange(qIndex, oIndex, e.target.value)
                  }
                  className="w-full p-2 border rounded mb-2"
                />
              ))}
              <button
                onClick={() => addOption(qIndex)}
                className="bg-green-500 text-white p-2 rounded"
              >
                + Add Option
              </button>
            </div>
          )}

          <button
            onClick={() => removeQuestion(qIndex)}
            className="bg-red-500 text-white p-2 rounded mt-2"
          >
            Remove Question
          </button>
        </div>
      ))}
      <div>
        <button
          onClick={submitSurvey}
          className={`bg-blue-600 text-white p-3 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Create Survey"}
        </button>
      </div>
      <div className={` pt-2 rounded  ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}>
        <button
          onClick={() => navigate("/admin")}
          className={`bg-blue-600 text-white p-3 rounded w-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          Go to Back
        </button>
      </div>
    </div>
  );
};

export default CreateSurvey;
