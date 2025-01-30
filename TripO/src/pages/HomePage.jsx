import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "./HomePage.css";

const tourSpots = [
  { name: "서울", image: "/assets/seoul.jpg" },
  { name: "강원", image: "/assets/kangwon.jpg" },
  { name: "충청", image: "/assets/chungcheong.jpg" },
  { name: "전라", image: "/assets/jeolla.jpg" },
  { name: "경상", image: "/assets/gyeongsang.jpg" },
  { name: "제주", image: "/assets/jeju.jpg" },
  { name: "부산", image: "/assets/busan.jpg" },
  { name: "인천", image: "/assets/incheon.jpg" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      <Header />
      <main className="content">
        <div className="tour-container">
          {tourSpots.map((spot, index) => (
            <div
              key={index}
              className="tour-card"
              style={{ backgroundImage: `url(${spot.image})` }}
              onClick={() =>
                navigate("/tour", { state: { keyword: spot.name } })
              }
            >
              <span>{spot.name}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
