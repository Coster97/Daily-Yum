import addUsers from "../src/addUsers.js";

// ✅ 새로운 사용자 추가 테스트 실행
const testUser = async () => {
  await addUsers("test-user-123", "테스트 유저", "test@example.com"); // ✅ 원하는 값 입력
};

testUser();
