import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  LinearProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { endpoint, user } from "../API/config";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const TakeSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userID, setUserID] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);

    const storedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
    const foundSurvey = storedSurveys.find((s) => s.surveyID === id);

    if (!foundSurvey) {
      Swal.fire({
        icon: "error",
        title: "Survey Not Found",
        text: "Redirecting to dashboard...",
        backdrop: "rgba(0,0,0,0.7)",
        confirmButtonColor: "#1D4ED8",
      });
      navigate("/dashboard");
      return;
    }

    setSurvey(foundSurvey);
  }, [id, navigate]);

  const handleChange = (questionId, value) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Survey",
        text: "Please answer at least one question.",
        confirmButtonColor: "#1D4ED8",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${endpoint}${user.submitResponse}`,
        { surveyID: id, userID, answers },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.statusCode === 201) {
        // Save response locally
        const storedResponses =
          JSON.parse(localStorage.getItem("answers")) || [];
        storedResponses.push({ surveyId: id, userID, answers });
        localStorage.setItem("answers", JSON.stringify(storedResponses));

        Swal.fire({
          icon: "success",
          title: "Survey Submitted!",
          text: "Thank you for your participation.",
          timer: 1500,
          showConfirmButton: false,
          backdrop: "rgba(0,0,0,0.7)",
        }).then(() => {
          navigate("/show-surveys");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting your response.",
          confirmButtonColor: "#1D4ED8",
        });
      }
    } catch (error) {
      console.error("Error submitting survey:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting.",
        confirmButtonColor: "#1D4ED8",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!survey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading survey...</p>
        </div>
      </div>
    );
  }

  const question = survey.questions[currentQuestionIndex];
  const questionId = question.id || question.questionID;
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

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
        className="relative z-10 flex justify-center items-center min-h-screen"
      >
        <motion.div
          initial={{ y: 20, scale: 0.98 }}
          animate={{ y: 0, scale: 1 }}
          className="w-full max-w-3xl"
        >
          <Card className="shadow-xl rounded-2xl overflow-hidden bg-white/90 backdrop-blur-sm border border-white/20">
            {/* Survey Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
              <div className="flex justify-between items-center mb-2">
                <motion.button
                  onClick={() => navigate("/dashboard")}
                  className="flex items-center text-blue-100 hover:text-white transition-colors"
                  whileHover={{ x: -3 }}
                >
                  <FaArrowLeft className="mr-2" />
                  Back to Surveys
                </motion.button>
                <Typography variant="caption" className="text-blue-100">
                  {currentQuestionIndex + 1} of {survey.questions.length}
                </Typography>
              </div>
              <Typography variant="h4" className="font-bold">
                {survey.title}
              </Typography>
              <Typography variant="body2" className="text-blue-100 mt-1">
                {survey.description}
              </Typography>
            </div>

            {/* Progress Bar */}
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 6,
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#6cca33",
                },
              }}
            />

            <CardContent className="p-6">
              {/* Question */}
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Typography
                  variant="h6"
                  className="text-lg font-semibold mb-6 text-gray-800"
                >
                  {question.questionText}
                  {question.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </Typography>

                {/* Answer Options */}
                {question.type === "MCQ" ? (
                  <RadioGroup
                    value={answers[questionId] || ""}
                    onChange={(e) => handleChange(questionId, e.target.value)}
                  >
                    {question.options.map((option, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <FormControlLabel
                          value={option}
                          control={<Radio color="primary" />}
                          label={option}
                          className="mb-2"
                        />
                      </motion.div>
                    ))}
                  </RadioGroup>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Type your answer here..."
                      value={answers[questionId] || ""}
                      onChange={(e) => handleChange(questionId, e.target.value)}
                      multiline
                      rows={3}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "& fieldset": {
                            borderColor: "#E5E7EB",
                          },
                          "&:hover fieldset": {
                            borderColor: "#1D4ED8",
                          },
                        },
                      }}
                    />
                  </motion.div>
                )}
              </motion.div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {survey.questions.length > 1 && currentQuestionIndex > 0 && (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      startIcon={<FaChevronLeft />}
                      onClick={() =>
                        setCurrentQuestionIndex((prev) => prev - 1)
                      }
                      sx={{
                        color: "#1D4ED8",
                        borderColor: "#1D4ED8",
                        "&:hover": {
                          backgroundColor: "rgba(29, 78, 216, 0.04)",
                          borderColor: "#1D4ED8",
                        },
                      }}
                    >
                      Previous
                    </Button>
                  </motion.div>
                )}

                {survey.questions.length > 1 &&
                currentQuestionIndex < survey.questions.length - 1 ? (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<FaChevronRight />}
                      onClick={() =>
                        setCurrentQuestionIndex((prev) => prev + 1)
                      }
                      sx={{
                        backgroundColor: "#1D4ED8",
                        "&:hover": {
                          backgroundColor: "#1E40AF",
                        },
                      }}
                    >
                      Next
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<FaCheck />}
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      sx={{
                        backgroundColor: "#10B981",
                        "&:hover": {
                          backgroundColor: "#059669",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "#D1FAE5",
                          color: "#047857",
                        },
                      }}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Survey"}
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </Card>
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

export default TakeSurvey;
