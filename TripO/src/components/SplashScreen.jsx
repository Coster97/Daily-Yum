import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../styles/SplashScreen.css"; // ✅ CSS 파일 추가

const SplashScreen = () => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "/assets/splash_img1.jpg"; // ✅ 이미지 경로
    img.onload = () => setIsImageLoaded(true); // ✅ 이미지 로딩 완료 시 상태 변경
  }, []);

  return (
    <motion.div
      className="splash-screen"
      style={{
        backgroundImage: isImageLoaded
          ? "url('/assets/splash_img1.jpg')"
          : "none", // ✅ 이미지 로딩 전에는 표시하지 않음
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      initial={{ opacity: 0 }} // ✅ 처음에는 투명하게
      animate={{ opacity: isImageLoaded ? 1 : 0 }} // ✅ 이미지가 로딩되면 나타남
      transition={{ duration: 1.5, delay: isImageLoaded ? 0 : 1.5 }} // ✅ 로딩이 끝나야 애니메이션 시작
    >
      {isImageLoaded && ( // ✅ 이미지가 로드된 후 텍스트 표시
        <div className="splash-content">
          <h1>TripO</h1>
          <p>나를 찾는 여행</p>
        </div>
      )}
    </motion.div>
  );
};

export default SplashScreen;
