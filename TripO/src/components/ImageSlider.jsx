import React, { useState, useEffect } from "react";
import "./ImageSlider.css";

const images = [
  "/assets/seoul.jpg",
  "/assets/jeju.jpg",
  "/assets/jeolla.jpg",
  "/assets/chungcheong.jpg",
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0); // ✅ 상태 추가

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // ✅ 3초마다 변경

    return () => clearInterval(interval); // ✅ 컴포넌트가 사라질 때 인터벌 정리
  }, []);

  return (
    <div className="slider-container">
      {images.map((img, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}
    </div>
  );
};

export default ImageSlider;
