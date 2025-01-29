import React, { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import LoginPage from "./pages/LoginPage";

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return <>{showSplash ? <SplashScreen /> : <LoginPage />}</>;
};

export default App;
