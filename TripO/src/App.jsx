import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RestaurantPage from "./styles/RestaurantPage";
import CustomPage from "./pages/CustomPage";
import RecommendPage from "./pages/Recommend";
import TourPage from "./pages/TourPage";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

// ✅ 스플래시 후 자동 이동 로직 수정
const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 로컬 스토리지에 "splashShown" 이라는 키를 저장하는 함수
    const splashShown = localStorage.getItem("splashShown");

    if (splashShown === "true") {
      setShowSplash(false);
    } else {
      setTimeout(() => {
        localStorage.setItem("splashShown", "true");
        setShowSplash(false);
        navigate("/home");
      }, 3000);
    }
  }, [navigate]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/tour" element={<TourPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
      <Route path="/custom" element={<CustomPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
    </Routes>
  );
};

export default App;
