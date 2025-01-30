import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "./Header.css";

const Header = () => {
  const location = useLocation(); // ✅ 현재 URL 가져오기
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="container">
        <a href="/home">TripO</a>
        <div className="header-right">
          <button className="menu-button">
            <FiMenu size={24} />
          </button>
        </div>
      </div>
      <div className="container-2">
        <div
          className={`type-item ${
            location.pathname === "/home" || location.pathname === "/tour"
              ? "active"
              : ""
          }`}
          onClick={() => navigate("/home")}
        >
          여행
        </div>
        <div
          className={`type-item ${
            location.pathname === "/restaurant" ? "active" : ""
          }`}
          onClick={() => navigate("/restaurant")}
        >
          숙소
        </div>
        <div
          className={`type-item ${
            location.pathname === "/custom" ? "active" : ""
          }`}
          onClick={() => navigate("/custom")}
        >
          교통
        </div>
        <div
          className={`type-item ${
            location.pathname === "/recommend" ? "active" : ""
          }`}
          onClick={() => navigate("/recommend")}
        >
          특가
        </div>
      </div>
    </header>
  );
};

export default Header;
