// /* eslint-disable no-unused-vars */
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { motion } from "framer-motion";
// import { FaCog, FaBell, FaSearch } from "react-icons/fa";
// import SurveyCard from "../components/SurveyCard";
// import { endpoint, user } from "../API/config"; // Import API config

// function Dashboard() {
//   const navigate = useNavigate();
//   const [surveys, setSurveys] = useState([]);

//   // Manually setting userID (Replace with dynamic user fetching logic if needed)
//   const userID = localStorage.getItem("userID");
//   // const accessToken = localStorage.getItem("accessToken");

//   useEffect(() => {
//     const fetchSurveys = async () => {
//       try {
//         const response = await axios.post(
//           `${endpoint}${user.getAllSurvey}`,
//           {
//             userID: userID,
//           }
//         );

//         if (response.data.statusCode === 200) {
//           setSurveys(response.data.body); // Store survey list in state
//           localStorage.setItem("surveys",JSON.stringify(response.data.body))
//         } else {
//           console.error("Error fetching surveys:", response.data.body.error);
//         }
//       } catch (error) {
//         console.error("Error fetching surveys:", error.response || error);
//       }
//     };

//     fetchSurveys();
//   }, []);

//   return (
//     <div className="bg-slate-100 min-h-screen font-sans">
//       {/* Header */}
//       <header className="bg-blue-700 text-white py-4 px-6 flex justify-between items-center shadow-lg">
//         <h1 className="text-3xl font-bold text-amber-200">Insight Form</h1>
//         <nav className="flex items-center space-x-8">
//           <a
//             href="/dashboard"
//             className="text-lg text-white hover:text-amber-200"
//           >
//             Dashboard
//           </a>
//           <a
//             href="/show-surveys"
//             className="text-lg text-white hover:text-amber-200"
//           >
//             Show Surveys
//           </a>
//           <a href="/admin" className="text-lg text-white hover:text-amber-200">
//             Admin Panel
//           </a>
//           <div className="flex items-center space-x-4">
//             <FaSearch className="text-xl text-white cursor-pointer" />
//             <FaBell className="text-xl text-white cursor-pointer" />
//             <FaCog className="text-xl text-white cursor-pointer" />
//           </div>
//         </nav>
//       </header>

//       {/* Survey List */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="p-8 pt-20"
//       >
//         <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
//           <h1 className="text-3xl font-bold text-blue-700 mb-6">All Surveys</h1>
//           <h2 className="text-lg text-gray-600 mb-4">Welcome, {userID}!</h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {surveys.length > 0 ? (
//               surveys.map((survey) => (
//                 <SurveyCard
//                   key={survey.surveyID}
//                   title={survey.title}
//                   description={survey.description}
//                   onClick={() => navigate(`/survey/${survey.surveyID}`)}
//                 />
//               ))
//             ) : (
//               <p>No surveys available.</p>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default Dashboard;


/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCog, FaBell, FaSearch } from "react-icons/fa";
import SurveyCard from "../components/SurveyCard";
import { endpoint, user } from "../API/config"; // Import API config

function Dashboard() {
  const navigate = useNavigate();
  const [surveys, setSurveys] = useState([]);

  // Get userID from local storage
  const userID = localStorage.getItem("userID");

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.post(
          `${endpoint}${user.getAllSurvey}`,
          { userID }
        );

        if (response.data.statusCode === 200) {
          setSurveys(response.data.body); // Store survey list in state
          localStorage.setItem("surveys", JSON.stringify(response.data.body));
        } else {
          console.error("Error fetching surveys:", response.data.body.error);
        }
      } catch (error) {
        console.error("Error fetching surveys:", error.response || error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen font-sans">
      {/* Header */}
      <header className="w-full bg-white shadow-md py-4 px-6 rounded-b-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1
            className="text-3xl font-bold text-blue-700 tracking-wide"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Askly
          </h1>
          <nav className="flex items-center space-x-6">
            <a href="/dashboard" className="text-gray-700 hover:text-blue-500 transition">Dashboard</a>
            <a href="/show-surveys" className="text-gray-700 hover:text-blue-500 transition">Show Surveys</a>
            <a href="/admin" className="text-gray-700 hover:text-blue-500 transition">Admin Panel</a>
            <div className="flex items-center space-x-4 text-gray-600">
              <FaSearch className="hover:text-blue-500 cursor-pointer transition" />
              <FaBell className="hover:text-blue-500 cursor-pointer transition" />
              <FaCog className="hover:text-blue-500 cursor-pointer transition" />
            </div>
          </nav>
        </div>
      </header>

      {/* Survey List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-8 pt-12"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">All Surveys</h1>
          <h2 className="text-lg text-gray-600 mb-4">Welcome, {userID}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {surveys.length > 0 ? (
              surveys.map((survey) => (
                <SurveyCard
                  key={survey.surveyID}
                  title={survey.title}
                  description={survey.description}
                  onClick={() => navigate(`/survey/${survey.surveyID}`)}
                />
              ))
            ) : (
              <p className="text-gray-500">No surveys available.</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Dashboard;
