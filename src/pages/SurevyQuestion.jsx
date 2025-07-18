import React from "react";

const SurveyQuestion = ({ question, handleAnswer }) => {
  switch (question.Type) {
    case "MCQ":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          {question.Options.map((option) => (
            <label key={option} style={styles.label}>
              <input
                type="radio"
                name={question.QuestionID}
                value={option}
                onChange={(e) => handleAnswer(question.QuestionID, e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      );

    case "Likert":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          {question.Scale.map((value) => (
            <button key={value} style={styles.likertButton} onClick={() => handleAnswer(question.QuestionID, value)}>
              {value}
            </button>
          ))}
        </div>
      );

    case "Text":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          <textarea
            style={styles.textarea}
            onChange={(e) => handleAnswer(question.QuestionID, e.target.value)}
          />
        </div>
      );

    case "Rating":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star} onClick={() => handleAnswer(question.QuestionID, star)} style={styles.star}>
              ⭐
            </span>
          ))}
        </div>
      );

    case "YesNo":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          <button style={styles.yesButton} onClick={() => handleAnswer(question.QuestionID, "Yes")}>Yes</button>
          <button style={styles.noButton} onClick={() => handleAnswer(question.QuestionID, "No")}>No</button>
        </div>
      );

    case "Matrix":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          <table style={styles.table}>
            <thead>
              <tr>
                {question.Columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {question.Rows.map((row) => (
                <tr key={row}>
                  <td>{row}</td>
                  {question.Columns.map((col) => (
                    <td key={col}>
                      <input
                        type="radio"
                        name={`${question.QuestionID}-${row}`}
                        value={col}
                        onChange={(e) => handleAnswer(`${question.QuestionID}-${row}`, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "FileUpload":
      return (
        <div style={styles.questionContainer}>
          <p>{question.QuestionText}</p>
          <input type="file" onChange={(e) => handleAnswer(question.QuestionID, e.target.files[0])} />
        </div>
      );

    default:
      return <p>Unknown Question Type</p>;
  }
};

// **Styling**
const styles = {
  questionContainer: { marginBottom: "20px" },
  label: { display: "block", marginBottom: "5px" },
  textarea: { width: "100%", minHeight: "50px", padding: "8px" },
  likertButton: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "8px 15px",
    margin: "5px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  star: { cursor: "pointer", fontSize: "20px", marginRight: "5px" },
  yesButton: {
    backgroundColor: "#28a745",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
  },
  noButton: {
    backgroundColor: "#dc3545",
    color: "white",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  table: { width: "100%", borderCollapse: "collapse" },
};

export default SurveyQuestion;
