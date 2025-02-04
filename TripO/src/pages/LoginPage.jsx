import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";
import { signInWithGoogle, logout } from "../services/googleAuth";

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    if (userData) {
      setUser(userData);
      navigate("/home");
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <div className="login-container">
      <main className="login-content">
        <h1>TripO</h1>
        <p>나를 찾는 여행, 검색부터 예약까지 간편하게!</p>
        <div className="login-btn-container">
          <button id="kakao-btn" onClick={handleLogin}>
            <img src="/assets/kakao-icon.png" alt="카카오 아이콘" />
            카카오톡으로 계속하기
          </button>
          <button id="google-btn" onClick={handleLogin}>
            <img src="/assets/google-icon.png" alt="구글 아이콘" /> Google로
            계속하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
