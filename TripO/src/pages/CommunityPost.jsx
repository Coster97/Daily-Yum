import React, { useState } from "react";
import { auth } from "../services/firebaseConfig";
import Header from "../components/Header";
import addCommunityPost from "../services/community/addCommunityPost";

const CommunityPost = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // ✅ 이미지 미리보기
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [tools, setTools] = useState("");
  const [steps, setSteps] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ 이미지 선택 시 미리보기 설정
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ 게시글 업로드 함수
  const handleAddPost = async (e) => {
    e.preventDefault();
    if (!title || !description || !ingredients || !tools || !steps) {
      return alert("모든 입력란을 채워주세요!");
    }
    if (!image) return alert("이미지를 선택하세요!");
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) return alert("로그인이 필요합니다!");

      await addCommunityPost({
        userId: user.uid, // 작성자 ID
        imageUrl: preview, // ✅ 현재는 미리보기 URL (나중에 Firebase Storage로 변경 가능)
        title,
        description,
        ingredients: ingredients.split(","), // 쉼표(,)로 구분해 배열로 저장
        tools: tools.split(","),
        steps: steps.split("\n"), // 줄바꿈으로 구분해 배열로 저장
        createdAt: new Date(), // 생성 날짜
      });

      alert("게시글이 성공적으로 추가되었습니다!");

      // ✅ 입력값 초기화
      setImage(null);
      setPreview(null);
      setTitle("");
      setDescription("");
      setIngredients("");
      setTools("");
      setSteps("");
    } catch (error) {
      console.error("❌ 게시글 업로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2>새 레시피 작성</h2>
        <form onSubmit={handleAddPost}>
          <input
            type="text"
            placeholder="레시피 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="레시피 간단 설명"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="필요한 재료 (쉼표로 구분)"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
          <input
            type="text"
            placeholder="필요한 조리 도구 (쉼표로 구분)"
            value={tools}
            onChange={(e) => setTools(e.target.value)}
          />
          <textarea
            placeholder="요리 순서 (줄바꿈으로 구분)"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
          />

          {/* ✅ 이미지 업로드 */}
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="미리보기" width="200" />}

          <button type="submit" disabled={loading}>
            {loading ? "업로드 중..." : "게시글 올리기"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommunityPost;
