import { db } from "./src/services/firebaseConfig.js";
import { collection, getDocs } from "firebase/firestore";

// ✅ Firestore의 "users" 컬렉션 가져오기
const fetchUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users")); // "users" 컬렉션의 모든 문서 가져오기
    const users = [];

    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    console.log("📌 Firestore에서 가져온 사용자 데이터:");
    console.log(users);
  } catch (error) {
    console.error("🚨 Firestore 데이터 가져오기 오류:", error);
  }
};

// ✅ 실행
fetchUsers();
