import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css"; // 스타일 적용
import train from "/assets/train.png";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    navigate("/home");
  };

  return (
    <div className="login-container">
      <main className="login-content">
        <div className="login-text">
          <h1>TripO</h1>
          <p>지금 바로, 가볍게 떠나보세요!</p>
        </div>
        <div className="login-section">
          <button>카카오로 시작하기</button>
          <button>구글로 시작하기</button>
          <button>네이버로 시작하기</button>
          <button className="login-btn" onClick={handleLogin}>
            테스트 버튼
          </button>
        </div>
      </main>
      {/* ✅ 기차 애니메이션 추가 */}
      <div className="train-container">
        <img src={train} alt="기차" className="train-img" />
      </div>
    </div>
  );
};

export default LoginPage;
