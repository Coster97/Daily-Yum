import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/Recommend";
import CommunityPage from "./pages/Community";
import RecipePage from "./pages/RecipePage";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/recipe" element={<RecipePage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
