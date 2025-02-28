import React, { useState } from "react";
import { db, storage, auth } from "../services/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "../components/Header";
import addCommunityPost from "../services/community/addCommunityPost";

const UploadImage = () => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return alert("이미지를 선택하세요!");
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) return alert("로그인이 필요합니다!");

      // ✅ Firebase Storage에 이미지 업로드
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      const imageUrl = await getDownloadURL(storageRef); // ✅ URL 가져오기

      // ✅ Firestore에 이미지 URL 저장
      const postData = {
        userId: user.uid,
        imageUrl: imageUrl, // 🔥 Firebase Storage에서 가져온 URL 저장
        title: "테스트 이미지",
        description: "이건 테스트용 이미지입니다.",
        createdAt: new Date(),
      };

      await addDoc(collection(db, "communityPosts"), postData);
      alert("게시글이 성공적으로 추가되었습니다!");
      setImage(null);
    } catch (error) {
      console.error("❌ 이미지 업로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header/>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button onClick={uploadImage} disabled={loading}>
        {loading ? "업로드 중..." : "이미지 업로드"}
      </button>
      <button onClick={addCommunityPost}></button>
    </div>
  );
};

export default UploadImage;
