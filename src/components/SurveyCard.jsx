// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "./Button";

function SurveyCard({ title, description, progress = 0, onClick }) {
  // Ensure progress is within valid bounds (0-100)
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="relative overflow-hidden">
      {/* Background graphics */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-32 h-32 -mr-16 -mt-16 bg-blue-100 rounded-full opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 -ml-20 -mb-20 bg-indigo-100 rounded-full opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
      </div>

      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        className="relative z-10 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/80 transition-all duration-300 overflow-hidden"
      >
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-xl"></div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2 relative z-10">
          {title}
        </h3>
        <p className="text-gray-600 mb-4 relative z-10">{description}</p>

        {/* Progress Bar */}
        <div className="mb-4 relative z-10">
          <div className="w-full bg-gray-200/50 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full shadow-inner"
              initial={{ width: "0%" }}
              animate={{ width: `${safeProgress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {safeProgress === 100 ? (
              <span className="flex items-center">
                <span className="text-green-500 mr-1">✓</span> Completed
              </span>
            ) : (
              `${safeProgress}% Complete`
            )}
          </p>
        </div>

        <Button
          onClick={onClick}
          className={`w-full py-2.5 rounded-lg text-white transition-all font-medium text-lg relative z-10 ${
            safeProgress === 100
              ? "bg-green-500/90 hover:bg-green-500 cursor-not-allowed shadow-none"
              : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 shadow-md hover:shadow-lg"
          }`}
          disabled={safeProgress === 100}
        >
          {safeProgress === 100 ? (
            <span className="flex items-center justify-center">
              <svg
                className="w-5 h-5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Completed
            </span>
          ) : (
            "Take Survey"
          )}
        </Button>

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMCAwaDYwdjYwSDB6IiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTMwIDB2NjBNMCAzMGg2MCIgc3Ryb2tlPSJyZ2JhKDEwMCwxMTYsMjAwLDAuMSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==')]"></div>
      </motion.div>
    </div>
  );
}

export default SurveyCard;
