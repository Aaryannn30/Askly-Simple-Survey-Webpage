// import { motion } from "framer-motion";
// import Button from "./Button";

// function SurveyCard({ title, description, progress, onClick }) {
//   return (
//     <motion.div
//       whileHover={{ scale: 1.03 }}
//       className="p-6 bg-white rounded-lg shadow-md border border-slate-200"
//     >
//       <h3 className="text-xl font-bold text-blue-700 mb-2">{title}</h3>
//       <p className="text-gray-600 mb-4">{description}</p>
//       <div className="mb-4">
//         <div className="w-full bg-slate-200 rounded-full h-2.5">
//           <div
//             className="bg-blue-700 h-2.5 rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//         <p className="mt-1 text-sm text-gray-500">{progress}% Complete</p>
//       </div>
//       <Button onClick={onClick} className="bg-blue-700 hover:bg-blue-800 text-white">
//         Take Survey
//       </Button>
//     </motion.div>
//   );
// }

// export default SurveyCard;

import { motion } from "framer-motion";
import Button from "./Button";

function SurveyCard({ title, description, progress = 0, onClick }) {
  // Ensure progress is within valid bounds (0-100)
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="p-6 bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg border border-gray-200 transition duration-300"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-blue-500 h-full rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${safeProgress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {safeProgress === 100 ? "✅ Completed" : `${safeProgress}% Complete`}
        </p>
      </div>

      <Button
        onClick={onClick}
        className={`w-full py-2 rounded-lg text-white transition font-medium text-lg ${
          safeProgress === 100
            ? "bg-green-500 cursor-not-allowed"
            : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
        }`}
        disabled={safeProgress === 100}
      >
        {safeProgress === 100 ? "Completed" : "Take Survey"}
      </Button>
    </motion.div>
  );
}

export default SurveyCard;
