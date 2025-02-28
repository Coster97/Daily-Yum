import React, { useState } from "react";
import { auth } from "../services/firebaseConfig";
import Header from "../components/Header";
import addCommunityPost from "../services/community/addCommunityPost";
import "../styles/CommunityPost.css";

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
      <div className="post-flex-div">
        <div className="[ost-container">
          <h2>나만의 레시피를 작성해보세요.</h2>
          <form onSubmit={handleAddPost} className="post-form">
            {/* 이미지 업로드 */}
            <div className="form-group image-upload">
              <label className="form-label">레시피 대표 이미지</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {preview && (
                <img src={preview} alt="미리보기" className="postPreview-img" />
              )}
            </div>

            {/* 레시피 제목 */}
            <div className="form-group">
              <label className="form-label">레시피 제목</label>
              <input
                type="text"
                placeholder="레시피 제목을 입력하세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            {/* 레시피 설명 */}
            <div className="form-group">
              <label className="form-label">레시피 간단 설명</label>
              <textarea
                placeholder="레시피를 간단하게 설명해주세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* 필요한 재료 */}
            <div className="form-group">
              <label className="form-label">필요한 재료</label>
              <input
                type="text"
                placeholder="쉼표로 구분하여 입력 (예: 감자, 당근, 양파)"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
              />
            </div>

            {/* 필요한 조리 도구 */}
            <div className="form-group">
              <label className="form-label">필요한 조리 도구</label>
              <input
                type="text"
                placeholder="쉼표로 구분하여 입력 (예: 후라이팬, 국자)"
                value={tools}
                onChange={(e) => setTools(e.target.value)}
              />
            </div>

            {/* 요리 순서 */}
            <div className="form-group">
              <label className="form-label">요리 순서</label>
              <textarea
                placeholder="각 단계를 줄바꿈으로 구분하여 입력하세요"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
              />
            </div>

            {/* 업로드 버튼 */}
            <div className="form-group">
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? "업로드 중..." : "게시글 올리기"}
              </button>
            </div>
          </form>
        </div>
        {/* ✅ 세로 구분선 */}
        <div className="divider"></div>
        <div className="post-guide">
          <h2>작성 예시를 확인해보세요.</h2>
          <div>
            <img
              src="/assets/postExample.jpg"
              alt="밀푀유나베"
              className="postExample-img"
            />
            <h3>자취생 간단 밀푀유나베</h3>
            <p>냉장고 속 재료들로 간단하게 완성하는 오늘 저녁 추천 메뉴!</p>

            <p>
              <strong>필요한 재료:</strong> 배추, 깻잎, 소고기, 유부, 표고버섯,
              육수, 마늘
            </p>

            <p>
              <strong>필요한 조리 도구:</strong> 냄비, 가스레인지, 집게, 칼,
              도마
            </p>

            <p>
              <strong>요리 순서:</strong>
            </p>

            <ol>
              <li>배추와 깻잎을 한 장씩 겹쳐 소고기를 끼워 넣고 쌓아줍니다.</li>
              <li>
                겹겹이 쌓은 재료를 3~4cm 크기로 썰어 냄비에 돌려가며 채워
                넣습니다.
              </li>
              <li>중앙에는 표고버섯과 유부를 채워줍니다.</li>
              <li>육수를 냄비에 부어 센 불에서 끓여줍니다.</li>
              <li>끓기 시작하면 중불로 줄이고 10분 정도 더 끓입니다.</li>
              <li>마늘을 추가하고 간을 맞춘 후 맛있게 즐깁니다!</li>
            </ol>

            <p className="date">
              <strong>작성일:</strong> 2025-03-01
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityPost;
