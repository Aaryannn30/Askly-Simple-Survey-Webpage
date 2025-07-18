import { useState } from "react";
import Button from "../components/Button";
import Sidebar from "../components/Sidebar";
import { motion } from "framer-motion";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        // Simulate backend storage
        localStorage.setItem("uploadedFile", e.target.files[0].name);
      }
    }, 200);
  };

  const handleDelete = () => {
    setFile(null);
    setProgress(0);
    localStorage.removeItem("uploadedFile");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex-1 p-8 ml-64 bg-white rounded-lg shadow-md"
      >
        <h1 className="text-3xl font-bold text-primary mb-6">Upload Survey Files</h1>
        <div className="bg-gray-100 p-6 rounded-lg">
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-4 text-gray-700"
          />
          {file && (
            <>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 mb-4">Uploading: {file.name}</p>
              <Button variant="outline" onClick={handleDelete} className="hover:bg-red-50">
                Delete
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default FileUpload;