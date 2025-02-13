import { doc, deleteDoc } from "firebase/firestore";
import { db, auth } from "../firebaseConfig";

const deleteIngredient = async (id) => {
  try {
    const user = auth.currentUser;
    if (!user) return alert("로그인이 필요합니다!");

    const docRef = doc(db, `users/${user.uid}/ingredients`, id);
    await deleteDoc(docRef);

    console.log(`✅ 재료 삭제 완료! (문서 ID: ${id})`);
  } catch (error) {
    console.error("❌ 재료 삭제 실패:", error);
  }
};

export default deleteIngredient;
