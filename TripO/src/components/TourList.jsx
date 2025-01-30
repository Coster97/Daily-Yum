import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TourList.css";

const TourList = ({ keyword }) => {
  const [tourData, setTourData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTourData = async () => {
      const serviceKey =
        "tJVF4lXCxr%2BTzN4zoXJNxQgCqx3Pf2Bia9aEP%2FH4wX4mGrq2xgysXqpXYotUPWeIt5m9YuMBbzrsFY8Z%2BJLeQg%3D%3D";
      const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&areaCode=1&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TripO&keyword=${encodeURIComponent(
        keyword
      )}&_type=json`;

      try {
        const response = await axios.get(url);
        const items = response.data.response.body.items?.item || []; // ✅ 데이터가 없으면 빈 배열 반환
        setTourData(items);
      } catch (error) {
        console.error("API 호출 오류:", error);
        setError("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false); // ✅ 로딩 상태 해제
      }
    };

    fetchTourData();
  }, [keyword]); // ✅ keyword가 변경될 때마다 다시 호출

  if (loading) return <p></p>;
  if (error) return <p>🚨 {error}</p>;
  if (tourData.length === 0) return <p>여행지를 직접 추가해보세요!</p>;

  return (
    <div>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {tourData.map((tour, index) => (
          <li
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              marginBottom: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div className="tourlist-container">
              <img
                src={tour.firstimage || "https://via.placeholder.com/100"}
                alt={tour.title}
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "8px",
                }}
              />
              {/* 관광지 정보 */}
              <div className="tour-address">{tour.title}</div>
              {/* 관광지 이미지 */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TourList;
