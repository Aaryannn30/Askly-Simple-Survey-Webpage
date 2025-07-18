// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import Button from "../components/Button";
import { FaCog, FaBell, FaSearch } from "react-icons/fa";
import Header from "./Header";

function NotFound() {

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center p-4 pt-20"
      >
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary">404</h1>
          <p className="text-xl text-gray-600 mt-4">Oops! Page not found.</p>
          <Button onClick={() => window.history.back()} className="mt-6 bg-primary hover:bg-indigo-700">
            Go Back
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

export default NotFound;