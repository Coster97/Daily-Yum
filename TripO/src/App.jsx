import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/profile";
import HomePage from "./pages/HomePage";
import RecommendPage from "./pages/Recommend";
import CommunityPage from "./pages/Community";
import RecipePage from "./pages/RecipePage";
import ImageUpload from "./pages/ImageUpload";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/recommend" element={<RecommendPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/recipe" element={<RecipePage />} />
          <Route path="/upload" element={<ImageUpload />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
