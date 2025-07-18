import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";
import { endpoint, auth } from "../API/config";

function ConfirmSignup() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("pendingUsername"); // Retrieve stored username

  const handleConfirm = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${endpoint}/${auth.confirmSignUp}`, {
        username,
        confirmationCode : code,
      });

      if (response.data.statusCode === 200) {
        setSuccess("Verification successful! Redirecting to login...");
        localStorage.removeItem("pendingUsername"); // Remove stored username
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Invalid or expired code. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Confirm Signup</h2>
        {success && <p className="text-green-600 text-center">{success}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleConfirm}>
          <Input
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter the code sent to your email"
          />
          <Button type="submit" className="w-full mt-4 bg-blue-700 text-white">
            Confirm Account
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ConfirmSignup;
