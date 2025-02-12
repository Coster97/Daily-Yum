import { getDocs, collection, query, where } from "firebase/firestore";
import { db, auth } from "../services/firebaseConfig";

const fetchCategoryIngredients = async (category) => {
  try {
    const user = auth.currentUser;
    if (!user) {
      alert("로그인이 필요합니다!");
      return;
    }

    if (category != "전체") {
      // ✅ Firestore에서 카테고리가 일치하는 데이터만 가져오기
      const q = query(
        collection(db, `users/${user.uid}/ingredients`),
        where("category", "==", category) // 카테고리 필터링
      );
      const querySnapshot = await getDocs(q);

      const ingredients = [];
      querySnapshot.forEach((doc) => {
        ingredients.push({ id: doc.id, ...doc.data() });
      });

      console.log(`🔥 ${category} 재료 목록:`, ingredients);
      return ingredients; // 필터링된 재료 목록 반환
    } else {
      // ✅ Firestore에서 카테고리가 일치하는 데이터만 가져오기
      const q = query(collection(db, `users/${user.uid}/ingredients`));
      const querySnapshot = await getDocs(q);

      const ingredients = [];
      querySnapshot.forEach((doc) => {
        ingredients.push({ id: doc.id, ...doc.data() });
      });

      console.log(`🔥 ${category} 재료 목록:`, ingredients);
      return ingredients; // 필터링된 재료 목록 반환
    }
  } catch (error) {
    console.error("❌ Firestore 카테고리별 데이터 가져오기 실패:", error);
  }
};

export default fetchCategoryIngredients;
