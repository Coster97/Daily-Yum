import axios from "axios";

const serviceKey =
  "tJVF4lXCxr%2BTzN4zoXJNxQgCqx3Pf2Bia9aEP%2FH4wX4mGrq2xgysXqpXYotUPWeIt5m9YuMBbzrsFY8Z%2BJLeQg%3D%3D"; // 발급받은 API 키 입력

const fetchTourData = async () => {
  const keyword = "서울"; // 검색할 키워드
  const url = `http://apis.data.go.kr/B551011/KorService1/searchKeyword1?serviceKey=${serviceKey}&areaCode=1&numOfRows=10&pageNo=1&MobileOS=ETC&MobileApp=TripO&keyword=${encodeURIComponent(
    keyword
  )}&_type=json`;

  try {
    const response = await axios.get(url);
    console.log("API 응답 데이터:", response.data); // 콘솔에 결과 출력
  } catch (error) {
    console.error("API 호출 오류:", error);
  }
};

fetchTourData();
