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
import RestaurantPage from "./pages/RestaurantPage";
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
  const location = useLocation(); // ✅ 현재 경로 가져오기

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);

      // ✅ 현재 페이지가 "/" (루트)일 때만 "/home"으로 자동 이동
      if (location.pathname === "/" || location.pathname === "/splash") {
        navigate("/home");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location.pathname]);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/tour" element={<TourPage />} />
      <Route path="/restaurant" element={<RestaurantPage />} />
      <Route path="/custom" element={<CustomPage />} />
      <Route path="/recommend" element={<RecommendPage />} />
    </Routes>
  );
};

export default App;
