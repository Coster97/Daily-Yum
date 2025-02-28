import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const fetchCommunityPosts = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "communityPosts"));
    const posts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("🔥 불러온 커뮤니티 게시글:", posts);
    return posts; // 불러온 게시글 목록 반환
  } catch (error) {
    console.error("❌ 게시글 불러오기 실패:", error);
  }
};

export default fetchCommunityPosts;
