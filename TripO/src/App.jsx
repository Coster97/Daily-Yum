import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/Recommend";
import CommunitydPage from "./pages/Community";
import RecipePage from "./pages/RecipePage";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// ✅ 스플래시 후 자동 이동 로직 수정
const AppContent = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
      <Route path="/community" element={<CommunitydPage />} />
      <Route path="/recipe" element={<RecipePage />} />
    </Routes>
  );
};

export default App;
