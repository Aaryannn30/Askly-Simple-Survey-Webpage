import { motion } from "framer-motion";

function Button({ children, onClick, variant = "primary", disabled, className }) {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold text-white shadow-md transition-colors";
  const variants = {
    primary: "bg-blue-700 hover:bg-blue-800",
    secondary: "bg-amber-500 hover:bg-amber-600",
    outline: "bg-transparent border text-blue-700 hover:bg-blue-50",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${baseStyles} ${variants[variant]} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

export default Button;