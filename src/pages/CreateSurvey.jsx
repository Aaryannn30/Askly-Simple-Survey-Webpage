import { useEffect, useState } from "react";
import axios from "axios";
import { endpoint, admin } from "../API/config";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaPlus,
  FaTrash,
  FaArrowLeft,
  FaCheck,
  FaListUl,
  FaPen,
} from "react-icons/fa";

const CreateSurvey = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const userID = localStorage.getItem("userID");
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!userID || !accessToken || userID === "") {
      navigate("/login");
    }
  }, [navigate, userID, accessToken]);

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
    if (!title.trim()) return setMessage("Error : Survey title is required!");
    if (questions.length === 0)
      return setMessage("Error : At least one question is required!");

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
      setTimeout(() => {
        setTitle("");
        setDescription("");
        setQuestions([]);
        navigate("/admin");
      }, 1500);
    } catch (error) {
      console.error("Survey Creation Error:", error);
      setMessage(
        error.response?.data?.message ||
          "Error creating survey. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden p-6">
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
        className="relative z-10 max-w-3xl mx-auto"
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
                onClick={() => navigate("/admin")}
                className="flex items-center text-blue-100 hover:text-white transition-colors"
                whileHover={{ x: -3 }}
              >
                <FaArrowLeft className="mr-2" />
                Back to Admin Panel
              </motion.button>
              <motion.h1
                className="text-2xl font-bold flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <FaPen className="mr-3" />
                Create New Survey
              </motion.h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 mb-4 rounded-lg ${
                  message.includes("Error")
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </motion.div>
            )}

            {/* Survey Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-6"
            >
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Survey Title
                </label>
                <input
                  type="text"
                  placeholder="Enter survey title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter survey description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows="3"
                />
              </div>
            </motion.div>

            {/* Questions Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <FaListUl className="mr-2 text-blue-500" />
                  Questions
                </h2>
                <motion.button
                  onClick={addQuestion}
                  className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaPlus className="mr-2" />
                  Add Question
                </motion.button>
              </div>

              {questions.length === 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-700">
                  No questions added yet. Click "Add Question" to get started.
                </div>
              )}

              {questions.map((q, qIndex) => (
                <motion.div
                  key={q.id}
                  className="mb-6 p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium text-gray-700">
                      Question {qIndex + 1}
                    </h3>
                    <motion.button
                      onClick={() => removeQuestion(qIndex)}
                      className="text-red-500 hover:text-red-700 flex items-center text-sm"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash className="mr-1" />
                      Remove
                    </motion.button>
                  </div>

                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Enter question text"
                      value={q.questionText}
                      onChange={(e) =>
                        handleQuestionChange(
                          qIndex,
                          "questionText",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <select
                      value={q.type}
                      onChange={(e) =>
                        handleQuestionChange(qIndex, "type", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Text">Text Answer</option>
                      <option value="MCQ">Multiple Choice</option>
                      <option value="Likert">Likert Scale</option>
                    </select>
                  </div>

                  {q.type === "MCQ" && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Options
                      </h4>
                      {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <input
                            type="text"
                            placeholder={`Option ${oIndex + 1}`}
                            value={opt}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      ))}
                      <motion.button
                        onClick={() => addOption(qIndex)}
                        className="flex items-center text-blue-600 hover:text-blue-800 text-sm mt-2"
                        whileHover={{ x: 3 }}
                      >
                        <FaPlus className="mr-1" />
                        Add Option
                      </motion.button>
                    </div>
                  )}

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`required-${qIndex}`}
                      checked={q.required}
                      onChange={(e) =>
                        handleQuestionChange(
                          qIndex,
                          "required",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`required-${qIndex}`}
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Required question
                    </label>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <motion.button
                onClick={() => navigate("/admin")}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={loading}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={submitSurvey}
                className={`flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  <>
                    <FaCheck className="mr-2" />
                    Create Survey
                  </>
                )}
              </motion.button>
            </div>
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
};

export default CreateSurvey;
