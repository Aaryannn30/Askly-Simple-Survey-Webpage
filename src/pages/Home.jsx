import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { motion } from "framer-motion";
import { FaCog, FaBell, FaSearch } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Navbar */}
      

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center py-20 px-4 bg-gray-50"
      >
        <h2 className="text-5xl font-bold text-primary mb-4">Gather Insights Effortlessly</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Create surveys, collect real-time responses, and unlock powerful analytics.
        </p>
        <img
          src="https://images.unsplash.com/photo-1551288049-b5f3c2e9b10a?q=80&w=2070&auto=format&fit=crop"
          alt="Survey Illustration"
          className="w-full max-w-2xl mx-auto mb-8 rounded-lg shadow-lg"
        />
        <Button onClick={() => navigate("/signup")} className="bg-primary hover:bg-indigo-700">
          Start Now
        </Button>
      </motion.section>

      {/* Footer */}
      <footer className="bg-primary text-white py-6 px-6 text-center shadow-inner">
        <p className="text-lg">© 2025 Insight Form. All rights reserved.</p>
        <div className="mt-2 space-x-6 text-lg">
          <a href="/login" className="hover:text-secondary">Login</a>
          <a href="/signup" className="hover:text-secondary">Sign Up</a>
          <a href="/dashboard" className="hover:text-secondary">Dashboard</a>
        </div>
      </footer>
    </div>
  );
}

export default Home;
