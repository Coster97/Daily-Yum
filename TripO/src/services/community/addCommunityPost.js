import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const addCommunityPost = async (post) => {
  try {
    const user = auth.currentUser;
    if (!user) return alert("로그인이 필요합니다!");

    await addDoc(collection(db, "communityPosts"), {
      userId: user.uid, // 작성자 ID
      imageUrl: "https://i.ibb.co/q3bYpWzj/IMG-1623.jpg", // 대표 이미지 (URL)
      title: post.title,
      description: post.description,
      ingredients: post.ingredients,
      tools: post.tools,
      steps: post.steps,
      createdAt: new Date(), // 생성 날짜
    });

    alert("게시글이 성공적으로 추가되었습니다!");
  } catch (error) {
    console.error("❌ 게시글 추가 실패:", error);
  }
};

export default addCommunityPost;
