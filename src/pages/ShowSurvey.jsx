// import { useState, useEffect } from "react";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// function ShowSurvey() {
//   const navigate = useNavigate();
//   const userID = localStorage.getItem("userID");
//   const [answeredSurveys, setAnsweredSurveys] = useState([]);
//   const [userResponses, setUserResponses] = useState({});

//   useEffect(() => {
//     const savedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
//     const storedResponses = JSON.parse(localStorage.getItem("answers")) || [];

//     // Filter responses for the current user
//     const userSurveyResponses = storedResponses.filter(
//       (resp) => resp.userID === userID
//     );

//     // Extract answered survey IDs
//     const answeredSurveyIds = userSurveyResponses.map((resp) => resp.surveyId);

//     // Find matching surveys
//     const answeredList = savedSurveys.filter((survey) =>
//       answeredSurveyIds.includes(survey.surveyID)
//     );

//     setAnsweredSurveys(answeredList);

//     // Map responses for easier access
//     const responseMap = {};
//     userSurveyResponses.forEach((resp) => {
//       responseMap[resp.surveyId] = resp.answers;
//     });

//     setUserResponses(responseMap);
//   }, [userID]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="p-8 pt-20 bg-slate-100 min-h-screen"
//     >
//       <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
//         <h1 className="text-3xl font-bold text-blue-700 mb-6">
//           Your Answered Surveys
//         </h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {answeredSurveys.length > 0 ? (
//             answeredSurveys.map((survey) => (
//               <div
//                 key={survey.surveyID}
//                 className="bg-gray-100 p-4 rounded-lg shadow"
//               >
//                 <h2 className="text-lg font-bold">{survey.title}</h2>
//                 <p className="text-gray-600">{survey.description}</p>

//                 <h3 className="mt-3 font-semibold">Your Responses:</h3>
//                 <ul className="list-disc ml-5">
//                   {survey.questions.map((q) => (
//                     <li key={q.id}>
//                       <strong>{q.questionText}:</strong>{" "}
//                       {userResponses[survey.surveyID]?.[q.id] || "No response"}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500">No answered surveys available.</p>
//           )}
//         </div>
//         <button
//           onClick={() => navigate(`/dashboard`)}
//           className="mt-3 px-4 py-2 bg-blue-500 text-white rounded"
//         >
//           go to dashboard
//         </button>
//       </div>
//     </motion.div>
//   );
// }

// export default ShowSurvey;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function ShowSurvey() {
  const navigate = useNavigate();
  const userID = localStorage.getItem("userID");
  const [answeredSurveys, setAnsweredSurveys] = useState([]);
  const [userResponses, setUserResponses] = useState({});

  useEffect(() => {
    const savedSurveys = JSON.parse(localStorage.getItem("surveys")) || [];
    const storedResponses = JSON.parse(localStorage.getItem("answers")) || [];

    // Filter responses for the current user
    const userSurveyResponses = storedResponses.filter(
      (resp) => resp.userID === userID
    );

    // Extract answered survey IDs
    const answeredSurveyIds = userSurveyResponses.map((resp) => resp.surveyId);

    // Find matching surveys
    const answeredList = savedSurveys.filter((survey) =>
      answeredSurveyIds.includes(survey.surveyID)
    );

    setAnsweredSurveys(answeredList);

    // Map responses for easier access
    const responseMap = {};
    userSurveyResponses.forEach((resp) => {
      responseMap[resp.surveyId] = resp.answers;
    });

    setUserResponses(responseMap);
  }, [userID]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-8 pt-20 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen flex flex-col items-center"
    >
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl w-full">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
          Your Answered Surveys
        </h1>

        {answeredSurveys.length > 0 ? (
          <div className="space-y-6">
            {answeredSurveys.map((survey) => (
              <div
                key={survey.surveyID}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-start justify-between"
              >
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {survey.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{survey.description}</p>

                  <h3 className="font-semibold text-blue-700">
                    Your Responses:
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-inner w-full">
                    <ul className="list-none space-y-2">
                      {survey.questions.map((q) => (
                        <li key={q.id} className="text-gray-700">
                          <strong className="text-gray-900">
                            {q.questionText}:
                          </strong>{" "}
                          <span className="text-blue-700">
                            {userResponses[survey.surveyID]?.[q.id] ||
                              "No response"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Status Indicator */}
                <div className="text-white px-4 py-2 rounded-lg bg-green-600 shadow-md">
                  Completed
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-lg">
            No answered surveys available.
          </p>
        )}

        {/* Back to Dashboard Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate(`/dashboard`)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg shadow-md hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default ShowSurvey;
