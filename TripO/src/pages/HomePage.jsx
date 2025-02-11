import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../styles/HomePage.css";


const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header />
      <main className="content">
        <div className="tour-container">
          
        </div>
      </main>
    </div>
  );
};

export default HomePage;
