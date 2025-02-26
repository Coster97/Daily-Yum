import { db, auth } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const addIngredient = async (ingredient) => {
  try {
    const user = auth.currentUser;
    if (!user) return alert("로그인이 필요합니다!");

    await addDoc(collection(db, `users/${user.uid}/ingredients`), {
      name: ingredient.name, // 재료 이름
      category: ingredient.category, // 재료 카테고리
      amount: ingredient.amount, // 재료 양
      createdAt: new Date(), // 저장 시간 자동 생성
    });

    alert("재료가 성공적으로 추가되었습니다!");
  } catch (error) {
    console.error("❌ 재료 추가 실패:", error);
  }
};

export default addIngredient;
