import React, { useState, useEffect } from "react";
import SurveyQuestion from "./SurveyQuestion";
import { Button, Paper, Typography } from "@mui/material";

const SurveyForm = ({ surveyID }) => {
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});

  useEffect(() => {
    fetch(`https://your-api.com/get-survey?surveyID=${surveyID}`)
      .then((res) => res.json())
      .then((data) => setSurvey(data))
      .catch((err) => console.error("Error fetching survey:", err));
  }, [surveyID]);

  const handleAnswer = (questionID, answer) => {
    setResponses({ ...responses, [questionID]: answer });
  };

  const handleSubmit = () => {
    if (Object.keys(responses).length < survey.questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    fetch("https://your-api.com/submit-response", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        surveyID,
        userID: "user-123",
        answers: responses,
      }),
    })
      .then((res) => res.json())
      .then(() => alert("Response submitted!"))
      .catch((err) => console.error("Error submitting response:", err));
  };

  if (!survey) return <p>Loading survey...</p>;

  return (
    <Paper elevation={3} style={{ padding: 20, maxWidth: 600, margin: "20px auto" }}>
      <Typography variant="h5">{survey.title}</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {survey.description}
      </Typography>

      {survey.questions.map((question) => (
        <SurveyQuestion key={question.QuestionID} question={question} handleAnswer={handleAnswer} />
      ))}

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleSubmit}
        style={{ marginTop: 20 }}
      >
        Submit
      </Button>
    </Paper>
  );
};

export default SurveyForm;
