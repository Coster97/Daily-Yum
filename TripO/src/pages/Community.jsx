import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import fetchCommunityPosts from "../services/community/fetchCommunityPosts"; // ✅ 게시글 불러오기 함수
import Header from "../components/Header";
import "../styles/Community.css";
import { FaPencilAlt } from "react-icons/fa";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]); // ✅ 게시글 목록 저장
  const [scrappedPosts, setScrappedPosts] = useState({});
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // ✅ Firestore에서 게시글 가져오기
  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchCommunityPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  // ✅ 특정 게시글의 스크랩 상태를 토글하는 함수
  const toggleScrap = (postId) => {
    // if (!user) return navigate("/login");
    setScrappedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId], // 현재 상태 반대로 변경
    }));
  };

  const goToPostPage = () => {
    if (!user) {
      console.log("hi");
      navigate("/login");
    } else {
      console.log("good");
      navigate("/community/new");
    }
  };

  return (
    <div>
      <Header />
      <div className="community-flex-div">
        <div className="posts-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="post-image"
                  />
                  <h3>{post.title}</h3>

                  <div className="post-ingredients">
                    <strong>필요한 재료:</strong> {post.ingredients.join(", ")}
                  </div>
                </div>

                <div className="post-card-bottom">
                  <p className="date">
                    {post.createdAt
                      ? new Date(post.createdAt.toDate()).toLocaleDateString()
                      : "날짜 없음"}
                  </p>
                  <div
                    className={`post-scrap ${
                      scrappedPosts[post.id] ? "scrapped" : ""
                    }`}
                    onClick={() => toggleScrap(post.id)}
                  >
                    ☆
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
        <div class="post-btn-div">
          <button className="post-btn" onClick={goToPostPage}>
            <FaPencilAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
