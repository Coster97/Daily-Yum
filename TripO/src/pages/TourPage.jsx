import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";

const TourPage = () => {
  const location = useLocation();
  const [keyword, setKeyword] = useState(location.state?.keyword || "서울");

  return (
    <div className="tour-page">
      <Header />
      <main className="content">
        <input
          type="text"
          placeholder={`🔍 ${keyword}의 가장 인기있는 여행지`}
        />
      </main>
    </div>
  );
};

export default TourPage;
