import React from "react";
import { Radio, RadioGroup, FormControlLabel, FormControl, TextField, Button } from "@mui/material";

const SurveyQuestion = ({ question, handleAnswer }) => {
  switch (question.Type) {
    case "MCQ":
      return (
        <FormControl component="fieldset">
          <p>{question.QuestionText}</p>
          <RadioGroup onChange={(e) => handleAnswer(question.QuestionID, e.target.value)}>
            {question.Options.map((option) => (
              <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
            ))}
          </RadioGroup>
        </FormControl>
      );

    case "Text":
      return (
        <div>
          <p>{question.QuestionText}</p>
          <TextField fullWidth onChange={(e) => handleAnswer(question.QuestionID, e.target.value)} />
        </div>
      );

    case "Rating":
      return (
        <div>
          <p>{question.QuestionText}</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <Button key={star} onClick={() => handleAnswer(question.QuestionID, star)}>
              ⭐
            </Button>
          ))}
        </div>
      );

    case "YesNo":
      return (
        <div>
          <p>{question.QuestionText}</p>
          <Button onClick={() => handleAnswer(question.QuestionID, "Yes")}>Yes</Button>
          <Button onClick={() => handleAnswer(question.QuestionID, "No")}>No</Button>
        </div>
      );

    default:
      return <p>Unknown Question Type</p>;
  }
};

export default SurveyQuestion;
