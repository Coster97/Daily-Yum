import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TourPage from "./pages/TourPage";
import IngredientForm from "./pages/IngredientForm";

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
      <Route path="/" element={<IngredientForm />} />
      <Route path="/home" element={<IngredientForm />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tour" element={<TourPage />} />
    </Routes>
  );
};

export default App;
