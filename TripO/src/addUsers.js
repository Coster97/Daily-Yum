import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./services/firebaseConfig.js";

// ✅ Firestore에 새로운 사용자 추가 함수
const addUser = async (userId, name, email) => {
  try {
    console.log(`🔄 Firestore에 사용자 추가 중... [ID: ${userId}]`);

    // ✅ Firestore `users` 컬렉션에 데이터 추가
    const userRef = doc(collection(db, "users"), userId); // 특정 ID로 저장
    await setDoc(userRef, {
      name: name,
      email: email,
      createdAt: new Date(),
    });

    console.log(`✅ Firestore에 사용자 저장 성공! [ID: ${userId}]`);
  } catch (error) {
    console.error("🚨 Firestore 데이터 저장 오류:", error.message);
  }
};

export default addUser;
