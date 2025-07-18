// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// // eslint-disable-next-line no-unused-vars
// import { motion } from "framer-motion";
// import { FaCog, FaBell, FaSearch } from "react-icons/fa";
// import { Bar } from "react-chartjs-2";
// import Swal from "sweetalert2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import Header from "./Header";

// ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// function ViewResponses() {
//   const { id } = useParams();
//   const [survey, setSurvey] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const storedSurveys =
//       JSON.parse(localStorage.getItem("adminSurveys")) || [];
//     const selectedSurvey = storedSurveys.find((s) => s.surveyID === id);
//     setSurvey(selectedSurvey);
//   }, [id]);

//   if (!survey) {
//     navigate("/admin");
//     Swal.fire({
//       title: "NO DATA!",
//       text: "Ruturned Back!",
//       icon: "info",
//     });
//   }

//   const responseData = survey.responses || [];
//   const questionData = survey.questions;

//   // Processing MCQ and Likert responses for charting
//   const chartData = questionData
//     .filter((q) => q.type === "MCQ" || q.type === "Likert")
//     .map((q) => {
//       const responseCounts = {};
//       responseData.forEach((res) => {
//         const answer = res.answers[q.id];
//         if (answer) {
//           responseCounts[answer] = (responseCounts[answer] || 0) + 1;
//         }
//       });
//       return {
//         question: q.questionText,
//         labels: Object.keys(responseCounts),
//         data: Object.values(responseCounts),
//       };
//     });

//   return (
//     <div className="bg-slate-100 min-h-screen font-sans">
//       <Header />
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="p-8 pt-20"
//       >
//         <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
//           <h1 className="text-3xl font-bold text-blue-700 mb-6">
//             Survey Responses: {survey.title}
//           </h1>
//           {chartData.map((data, idx) => (
//             <div key={idx} className="bg-slate-50 p-6 rounded-lg mb-6">
//               <h2 className="text-xl font-semibold text-gray-800 mb-4">
//                 {data.question}
//               </h2>
//               <Bar
//                 data={{
//                   labels: data.labels,
//                   datasets: [
//                     {
//                       label: "Responses",
//                       data: data.data,
//                       backgroundColor: "rgba(54, 162, 235, 0.6)",
//                     },
//                   ],
//                 }}
//                 options={{ responsive: true }}
//               />
//             </div>
//           ))}
//           <div className="bg-slate-50 p-6 rounded-lg">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">
//               Text Responses
//             </h2>
//             <ul>
//               {responseData.map((res, idx) => (
//                 <li key={idx} className="border-t py-4">
//                   <p className="font-bold">User: {res.userID}</p>
//                   {questionData.map(
//                     (q) =>
//                       q.type === "Text" && (
//                         <p key={q.id} className="text-gray-800">
//                           <strong>{q.questionText}: </strong>
//                           {res.answers[q.id]}
//                         </p>
//                       )
//                   )}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default ViewResponses;


import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import Swal from "sweetalert2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import Header from "./Header";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function ViewResponses() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSurveys = JSON.parse(localStorage.getItem("adminSurveys")) || [];
    const selectedSurvey = storedSurveys.find((s) => s.surveyID === id);

    if (!selectedSurvey) {
      Swal.fire({
        title: "NO DATA!",
        text: "Returned Back!",
        icon: "info",
      }).then(() => {
        navigate("/admin"); // Navigate after showing alert
      });
    } else {
      setSurvey(selectedSurvey);
    }
  }, [id, navigate]);

  if (!survey) {
    return <div className="text-center text-xl p-10">Loading...</div>;
  }

  const responseData = survey.responses || [];
  const questionData = survey.questions || [];

  // Processing MCQ and Likert responses for charting
  const chartData = questionData
    .filter((q) => q.type === "MCQ" || q.type === "Likert")
    .map((q) => {
      const responseCounts = {};
      responseData.forEach((res) => {
        const answer = res.answers[q.id];
        if (answer) {
          responseCounts[answer] = (responseCounts[answer] || 0) + 1;
        }
      });
      return {
        question: q.questionText,
        labels: Object.keys(responseCounts),
        data: Object.values(responseCounts),
      };
    });

  return (
    <div className="bg-slate-100 min-h-screen font-sans">
      <Header />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 pt-20"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">
            Survey Responses: {survey.title}
          </h1>

          {/* Chart Section */}
          {chartData.map((data, idx) => (
            <div key={idx} className="bg-slate-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                {data.question}
              </h2>
              <Bar
                data={{
                  labels: data.labels,
                  datasets: [
                    {
                      label: "Responses",
                      data: data.data,
                      backgroundColor: "rgba(54, 162, 235, 0.6)",
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </div>
          ))}

          {/* Text Responses Section */}
          <div className="bg-slate-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Text Responses
            </h2>
            <ul>
              {responseData.map((res, idx) => (
                <li key={idx} className="border-t py-4">
                  <p className="font-bold">User: {res.userID}</p>
                  {questionData.map(
                    (q) =>
                      q.type === "Text" && (
                        <p key={q.id} className="text-gray-800">
                          <strong>{q.questionText}: </strong>
                          {res.answers[q.id]}
                        </p>
                      )
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default ViewResponses;
