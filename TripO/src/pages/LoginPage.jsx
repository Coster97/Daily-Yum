import React, { useState } from "react";
import "../styles/LoginPage.css";
import { signInWithGoogle, logout } from "../services/googleAuth";
import kakao from "/public/assets/kakao-icon.png";
import google from "/public/assets/google-icon.png";

const LoginPage = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    if (userData) {
      setUser(userData);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <div className="login-container">
      <main className="login-content">
        <h1>TripO</h1>
        <p>나를 찾는 여행, 검색부터 예약까지 간편하게!</p>
        <div className="login-btn-container">
          <button id="kakao-btn" onClick={handleLogin}>
            <img src={kakao}></img>카카오톡으로 계속하기
          </button>
          <button id="google-btn" onClick={handleLogin}>
            <img src={google}></img>Google로 계속하기
          </button>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
