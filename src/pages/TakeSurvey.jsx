// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Radio,
//   RadioGroup,
//   FormControlLabel,
//   TextField,
// } from "@mui/material";
// import Swal from "sweetalert2";
// import axios from "axios";
// import { endpoint, user } from "../API/config";

// const TakeSurvey = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [survey, setSurvey] = useState(null);
//   const [answers, setAnswers] = useState({});
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [userID, setUserID] = useState("");

//   useEffect(() => {
//     const storedUsername = localStorage.getItem("userID");
//     setUserID(storedUsername);

//     const storedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
//     const foundSurvey = storedSurveys.find((s) => s.surveyID === id);

//     if (!foundSurvey) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Survey Not Found!",
//       });
//       navigate("/dashboard");
//       return;
//     }

//     setSurvey(foundSurvey);
//   }, [id, navigate]);

//   const handleChange = (questionId, value) => {
//     setAnswers((prev) => ({
//       ...prev,
//       [questionId]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     if (Object.keys(answers).length === 0) {
//       alert("Please answer at least one question.");
//       return;
//     }

//     const storedResponses = JSON.parse(localStorage.getItem("answers")) || [];
//     const alreadyAnswered = storedResponses.some(
//       (resp) => resp.surveyId === id && resp.userID === userID
//     );

//     if (alreadyAnswered) {
//       alert("You have already completed this survey.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${endpoint}${user.submitResponse}`, // API Endpoint
//         { surveyID: id, userID, answers }, // Request Body
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.data.statusCode === 201) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Survey submitted successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         console.log("Response ID:", response.data.responseID);
//       } else {
//         Swal.fire({
//           position: "top-end",
//           icon: "error",
//           title: "Failed to submit survey.",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//       }
//     } catch (error) {
//       console.error("Error submitting survey:", error.response?.data || error);
//       Swal.fire({
//         position: "top-end",
//         icon: "error",
//         title: "Error submitting survey.",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//     }

//     const newResponse = { surveyId: id, userID, answers };
//     storedResponses.push(newResponse);
//     localStorage.setItem("answers", JSON.stringify(storedResponses));
//     navigate("/show-surveys");
//   };

//   if (!survey) return <p>Loading survey...</p>;

//   const question = survey.questions[currentQuestionIndex];
//   const questionId = question.id || question.questionID; // Fix ID issue

//   return (
//     <Card style={{ maxWidth: 600, margin: "20px auto", padding: 20 }}>
//       <CardContent>
//         <Typography variant="h5" gutterBottom>
//           {survey.title}
//         </Typography>
//         <Typography variant="body1" color="textSecondary" gutterBottom>
//           {survey.description}
//         </Typography>

//         <Typography variant="h6">{question.questionText}</Typography>

//         {question.type === "MCQ" ? (
//           <RadioGroup
//             value={answers[questionId] || ""}
//             onChange={(e) => handleChange(questionId, e.target.value)}
//           >
//             {question.options.map((option, i) => (
//               <FormControlLabel
//                 key={i}
//                 value={option}
//                 control={<Radio />}
//                 label={option}
//               />
//             ))}
//           </RadioGroup>
//         ) : (
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder="Your answer"
//             value={answers[questionId] || ""}
//             onChange={(e) => handleChange(questionId, e.target.value)}
//           />
//         )}

//         <div
//           style={{
//             marginTop: 20,
//             display: "flex",
//             justifyContent: "space-between",
//           }}
//         >
//           {survey.questions.length > 1 && currentQuestionIndex > 0 && (
//             <Button
//               variant="contained"
//               onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
//             >
//               Previous
//             </Button>
//           )}

//           {survey.questions.length > 1 &&
//           currentQuestionIndex < survey.questions.length - 1 ? (
//             <Button
//               variant="contained"
//               onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
//             >
//               Next
//             </Button>
//           ) : (
//             <Button variant="contained" color="primary" onClick={handleSubmit}>
//               Submit
//             </Button>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default TakeSurvey;

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

const TakeSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userID, setUserID] = useState("");

  useEffect(() => {
    const storedUserID = localStorage.getItem("userID");
    setUserID(storedUserID);

    const storedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
    const foundSurvey = storedSurveys.find((s) => s.surveyID === id);

    if (!foundSurvey) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Survey Not Found!",
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

    console.log("Updated Answers:", answers);
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Incomplete Survey",
        text: "Please answer at least one question.",
      });
      return;
    }

    try {
      console.log("Submitting:", { surveyID: id, userID, answers });

      const response = await axios.post(
        `${endpoint}${user.submitResponse}`,
        { surveyID: id, userID, answers },
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Server Response:", response.data);

      if (response.data.statusCode === 201) {
        Swal.fire({
          icon: "success",
          title: "Survey Submitted!",
          text: "Thank you for your participation.",
          timer: 1500,
          showConfirmButton: false,
        });

        // Save response locally
        const storedResponses = JSON.parse(localStorage.getItem("answers")) || [];
        storedResponses.push({ surveyId: id, userID, answers });
        localStorage.setItem("answers", JSON.stringify(storedResponses));

        navigate("/show-surveys");
      } else {
        Swal.fire({
          icon: "error",
          title: "Submission Failed",
          text: "An error occurred while submitting your response.",
        });
      }
    } catch (error) {
      console.error("Error submitting survey:", error.response?.data || error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Something went wrong while submitting.",
      });
    }
  };

  if (!survey) return <p>Loading survey...</p>;

  const question = survey.questions[currentQuestionIndex];
  const questionId = question.id || question.questionID;
  const progress = ((currentQuestionIndex + 1) / survey.questions.length) * 100;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
      <Card className="shadow-lg rounded-lg p-6 w-full max-w-3xl bg-white">
        <CardContent>
          <Typography variant="h4" className="text-center text-blue-700 font-bold mb-4">
            {survey.title}
          </Typography>
          <Typography variant="body1" className="text-center text-gray-600 mb-6">
            {survey.description}
          </Typography>

          {/* Progress Bar */}
          <LinearProgress variant="determinate" value={progress} className="mb-4" />
          <Typography variant="body2" className="text-gray-500 mb-4 text-center">
            {currentQuestionIndex + 1} of {survey.questions.length} Questions
          </Typography>

          {/* Question Text */}
          <Typography variant="h6" className="text-lg font-semibold mb-3 text-gray-800">
            {question.questionText}
          </Typography>

          {/* Answer Options */}
          {question.type === "MCQ" ? (
            <RadioGroup
              value={answers[questionId] || ""}
              onChange={(e) => handleChange(questionId, e.target.value)}
            >
              {question.options.map((option, i) => (
                <FormControlLabel
                  key={i}
                  value={option}
                  control={<Radio color="primary" />}
                  label={option}
                />
              ))}
            </RadioGroup>
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Your answer"
              value={answers[questionId] || ""}
              onChange={(e) => handleChange(questionId, e.target.value)}
              className="mb-4"
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-6">
            {survey.questions.length > 1 && currentQuestionIndex > 0 && (
              <Button
                variant="contained"
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              >
                Previous
              </Button>
            )}

            {survey.questions.length > 1 &&
            currentQuestionIndex < survey.questions.length - 1 ? (
              <Button
                variant="contained"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
                onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
              >
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TakeSurvey;
