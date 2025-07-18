import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Admin Panel", path: "/admin" },
  ];

  return (
    <motion.div
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      className="w-64 bg-primary h-screen p-6 text-white fixed"
    >
      <h2 className="text-2xl font-bold mb-8">Askly Simple Survey Webpage</h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path} className="mb-4">
            <button
              onClick={() => navigate(item.path)}
              className="w-full text-left py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default Sidebar;