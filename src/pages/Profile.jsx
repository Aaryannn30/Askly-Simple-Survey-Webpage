import { useState, useEffect } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function Profile() {
  const [form, setForm] = useState({ email: "", username: "", password: "" });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setForm({ email: user.email || "", username: user.username || "", password: "" });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate backend update
    localStorage.setItem("user", JSON.stringify({ email: form.email, username: form.username }));
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8 ml-64 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Your Profile</h1>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg max-w-md">
          <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <Input
            label="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            label="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <Input
            label="New Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button type="submit" className="w-full mt-6 bg-primary hover:bg-indigo-700">
            Update Profile
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default Profile;