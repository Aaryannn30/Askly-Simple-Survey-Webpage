// import { Button } from "@mui/material";
// import axios from "axios";
// import React from "react";
// import { FaBell, FaCog, FaSearch } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const Header = () => {
//     const isLoggedIn = !!localStorage.getItem("accessToken");
//     const navigate = useNavigate();
//     const handleLogout = async () => {
//         const accessToken = localStorage.getItem("accessToken");

//         if (!accessToken) {
//             console.error("No access token found");
//             return;
//         }

//         try {
//             await axios.post(
//                 "https://bcukdw29le.execute-api.ap-south-1.amazonaws.com/dev/user/logout",
//                 { body : { accessToken } }
//             );

//             // Remove token from storage
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("userID");

//             // Redirect to login
//             navigate("/login");
//         } catch (error) {
//             console.error("Logout failed:", error.response?.data || error.message);
//         }
//     };
//     return (
//         <div>
//             <header className="bg-primary text-white py-4 px-6 flex justify-between items-center shadow-md">
//                 <h1
//                     className="text-3xl font-bold"
//                     style={{ fontFamily: "'Dancing Script', cursive" }}
//                 >
//                     Insight Form
//                 </h1>
//                 <nav className="flex items-center space-x-6">
//                     <a href="/dashboard" className="text-lg hover:text-secondary">
//                         Dashboard
//                     </a>
//                     <a href="/survey/1" className="text-lg hover:text-secondary">
//                         Survey
//                     </a>
//                     <a href="/admin" className="text-lg hover:text-secondary">
//                         Admin Panel
//                     </a>
//                     <div className="flex items-center space-x-4">
//                         <FaSearch className="text-xl hover:text-secondary cursor-pointer" />
//                         <FaBell className="text-xl hover:text-secondary cursor-pointer" />
//                         <FaCog className="text-xl hover:text-secondary cursor-pointer" />
//                     </div>
//                     {isLoggedIn ? (
//                         <>
//                             <img
//                                 src="https://via.placeholder.com/40"
//                                 alt="Profile"
//                                 className="w-10 h-10 rounded-full cursor-pointer"
//                                 onClick={() => navigate("/profile")}
//                             />
//                             <Button
//                                 onClick={handleLogout}
//                                 className="bg-secondary hover:bg-green-600"
//                             >
//                                 Logout
//                             </Button>
//                         </>
//                     ) : (
//                         <div className="flex space-x-4">
//                             <Button
//                                 onClick={() => navigate("/login")}
//                                 className="bg-secondary hover:bg-green-600"
//                             >
//                                 Login
//                             </Button>
//                             <Button
//                                 onClick={() => navigate("/signup")}
//                                 variant="outline"
//                                 className="border-white text-white hover:bg-secondary"
//                             >
//                                 Sign Up
//                             </Button>
//                         </div>
//                     )}
//                 </nav>
//             </header>
//         </div>
//     );
// };

// export default Header;

import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  const navigate = useNavigate();

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) return;

    try {
      await axios.post(
        "https://bcukdw29le.execute-api.ap-south-1.amazonaws.com/dev/user/logout",
        { body: { accessToken } }
      );

      localStorage.removeItem("accessToken");
      localStorage.removeItem("userID");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-50 to-blue-100 shadow-md py-4 px-6 rounded-b-lg">
      <div className="w-full max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-semibold text-blue-700 tracking-wide" style={{ fontFamily: "'Dancing Script', cursive" }}>
          Askly
        </h1>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <a href="/dashboard" className="text-gray-700 hover:text-blue-500 transition">Dashboard</a>
          <a href="/survey/1" className="text-gray-700 hover:text-blue-500 transition">Survey</a>
          <a href="/admin" className="text-gray-700 hover:text-blue-500 transition">Admin Panel</a>
        </nav>

        {/* Icons & Actions */}
        <div className="flex items-center space-x-4 text-gray-600">
          <FaSearch className="hover:text-blue-500 cursor-pointer transition" />
          <FaBell className="hover:text-blue-500 cursor-pointer transition" />
          <FaCog className="hover:text-blue-500 cursor-pointer transition" />

          {/* Authentication Actions */}
          {isLoggedIn ? (
            <>
              <img
                src="https://via.placeholder.com/40"
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => navigate("/profile")}
              />
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg text-sm hover:bg-blue-500 hover:text-white transition"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
