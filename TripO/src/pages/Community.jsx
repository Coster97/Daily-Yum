import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebaseConfig";
import fetchCommunityPosts from "../services/community/fetchCommunityPosts"; // ✅ 게시글 불러오기 함수
import Header from "../components/Header";
import "../styles/Community.css";
import { FaPencilAlt } from "react-icons/fa";

const CommunityPage = () => {
  const [posts, setPosts] = useState([]); // ✅ 게시글 목록 저장
  const navigate = useNavigate();

  // ✅ Firestore에서 게시글 가져오기
  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchCommunityPosts();
      setPosts(fetchedPosts);
    };
    loadPosts();
  }, []);

  return (
    <div>
      <Header />
      <div className="community-flex-div">
        <div className="posts-container">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="post-image"
                />
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <p>
                  <strong>필요한 재료:</strong> {post.ingredients.join(", ")}
                </p>
                <p className="date">
                  {post.createdAt
                    ? new Date(post.createdAt.toDate()).toLocaleDateString()
                    : "날짜 없음"}
                </p>
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
        <div class="post-btn-div">
          <button className="post-btn" onClick={() => navigate("/upload")}>
            <FaPencilAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
