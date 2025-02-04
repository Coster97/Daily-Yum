import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import "../styles/Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
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
        <a href="/home">TripO</a>
        <div className="header-right">
          <button className="menu-button" onClick={toggleMenu}>
            <FiMenu size={24} />
          </button>

          {/* ✅ 외부 클릭 감지를 위한 ref 추가 */}
          {isMenuOpen && (
            <div className="dropdown-menu" ref={menuRef}>
              <div onClick={() => navigate("/profile")}>프로필</div>
              <div onClick={() => navigate("/settings")}>설정</div>
              <div onClick={() => navigate("/logout")}>로그아웃</div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
