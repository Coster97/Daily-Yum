import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiUser } from "react-icons/fi"; // ✅ 아이콘 추가
import "../styles/Header.css";
import checkAuthState from "../services/authState"; // ✅ 로그인 상태 가져오기
import { signOut } from "firebase/auth";
import { auth } from "../services/firebaseConfig";
import logo from "/public/assets/logo.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // ✅ 로그인 상태 감지
  useEffect(() => {
    checkAuthState(setUser);
  }, []);

  // ✅ 메뉴 버튼 클릭 시 상태 토글
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // ✅ 로그아웃 함수
  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login"); // ✅ 로그아웃 후 로그인 페이지로 이동
  };

  // ✅ 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <a href="/home">
          <img src="/assets/logo.png" alt="Logo" className="logo" />
        </a>
        <div className="header-right">
          {user ? (
            // ✅ 로그인된 경우: 메뉴 버튼 + 드롭다운
            <>
              <button className="menu-button" onClick={toggleMenu}>
                <FiMenu size={24} />
              </button>

              {isMenuOpen && (
                <div className="dropdown-menu" ref={menuRef}>
                  <div onClick={() => navigate("/profile")}>프로필</div>
                  <div onClick={() => navigate("/settings")}>설정</div>
                  <div onClick={handleLogout}>로그아웃</div>
                </div>
              )}
            </>
          ) : (
            // ✅ 로그인되지 않은 경우: 로그인 버튼 표시
            <button className="menu-button" onClick={() => navigate("/login")}>
              <FiUser size={22} />
            </button>
          )}
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
          내 냉장고
        </div>
        <div
          className={`type-item ${
            location.pathname === "/restaurant" ? "active" : ""
          }`}
          onClick={() => navigate("/restaurant")}
        >
          추천요리
        </div>
        <div
          className={`type-item ${
            location.pathname === "/custom" ? "active" : ""
          }`}
          onClick={() => navigate("/custom")}
        >
          커뮤니티
        </div>
        <div
          className={`type-item ${
            location.pathname === "/recommend" ? "active" : ""
          }`}
          onClick={() => navigate("/recommend")}
        >
          오늘의 레시피
        </div>
      </div>
    </header>
  );
};

export default Header;
