import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";  
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import TakeSurvey from "./pages/TakeSurvey";
import AdminPanel from "./pages/AdminPanel";
import ViewResponses from "./pages/ViewResponses";
import FileUpload from "./pages/FileUpload";
import CreateSurvey from "./pages/CreateSurvey";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Confirm from "../src/pages/ConfirmSignup";
import SurveyQuestion from "./pages/SurevyQuestion";
import SurveyForm from "./pages/SurveyForm";
import ShowSurvey from "./pages/ShowSurvey";
import SurveyResponses from "./pages/SurveyResponses";
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/surveyquestion" element={<SurveyQuestion />} />
          <Route path="/surveyform" element={<SurveyForm />} />
          <Route path="/survey-responses" element={<SurveyResponses />} />
          <Route path="/confirm" element={<Confirm />} />
          <Route path="/show-surveys" element={<ShowSurvey />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/survey/:id" element={<TakeSurvey />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/survey/:id" element={<ViewResponses />} />
          <Route path="/admin/upload" element={<FileUpload />} />
          <Route path="/admin/create-survey" element={<CreateSurvey />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;