import { db, auth } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const addCommunityPost = async () => {
  try {
    const user = auth.currentUser;
    if (!user) return alert("로그인이 필요합니다!");

    const postData = {
      userId: user.uid, // 작성자 ID
      imageUrl: "https://example.com/sample-image.jpg", // 대표 이미지 (URL)
      title: "맛있는 라면 만들기",
      description: "집에서 간단하게 맛있는 라면을 만드는 방법을 소개합니다.",
      ingredients: ["라면", "물 500ml", "계란 1개", "대파"],
      tools: ["냄비", "가스레인지", "젓가락"],
      steps: [
        "물을 냄비에 넣고 끓입니다.",
        "물이 끓기 시작하면 라면 스프와 면을 넣습니다.",
        "면이 익으면 계란을 추가합니다.",
        "대파를 썰어 넣어 완성합니다.",
      ],
      createdAt: new Date(), // 생성 날짜
    };

    await addDoc(collection(db, "communityPosts"), postData);

    alert("게시글이 성공적으로 추가되었습니다!");
  } catch (error) {
    console.error("❌ 게시글 추가 실패:", error);
  }
};

export default addCommunityPost;
