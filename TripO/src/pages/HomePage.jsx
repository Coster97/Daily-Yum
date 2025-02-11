import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Header from "../components/Header";
import "../styles/Ingredient.css";

const HomePage = ({ setIngredients }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ 모달 상태 추가

  const defaultCategories = [
    "야채/채소",
    "과일",
    "육류",
    "해산물",
    "계란/유제품",
    "가공식품",
    "기타",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIngredient = {
      category: selectedCategory,
      name: selectedCategory === "기타" ? customIngredient : selectedIngredient,
      amount,
    };
    setIngredients((prev) => [...prev, newIngredient]);
    setIsModalOpen(false); // ✅ 재료 추가 후 모달 닫기
  };

  return (
    <div className="ingredient-div">
      <Header />

      <div className="ingredient-flex-div">
        {/* ✅ 냉장고 영역 */}
        <div className="fridge-section">
          <h3>내 냉장고</h3>
          <p>저장된 재료를 확인해보세요.</p>
          <button
            className="add-ingredient-btn"
            onClick={() => setIsModalOpen(true)}
          >
            + 재료 추가
          </button>
        </div>

        {/* ✅ 세로 구분선 */}
        <div className="divider"></div>

        {/* ✅ 재료 추가 폼 (PC에서만 보임) */}
        <div className="ingredient-form desktop-only">
          <h3>재료를 추가해보세요.</h3>
          <form onSubmit={handleSubmit}>
            <div className="step">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                {defaultCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="step">
              {selectedCategory && selectedCategory !== "기타" ? (
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                >
                  <option value="">재료 선택</option>
                </select>
              ) : selectedCategory === "기타" ? (
                <input
                  type="text"
                  placeholder="재료 이름 입력"
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                />
              ) : (
                <input
                  type="text"
                  placeholder="카테고리 먼저 선택하기"
                  disabled
                />
              )}
            </div>

            <div className="step">
              <input
                type="text"
                placeholder="예: 한 단, 500g"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <button type="submit" className="add-button">
              재료 추가하기
            </button>
          </form>
        </div>
      </div>

      {/* ✅ "페이지 같은" 모달 (모바일에서만 보임) */}
      {isModalOpen && (
        <div className="modal-page">
          <div className="modal-header">
            <button
              className="back-button"
              onClick={() => setIsModalOpen(false)}
            >
              <FaArrowLeft size={20} /> {/* ✅ 뒤로 가기 아이콘 적용 */}
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="step">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">카테고리 선택</option>
                  {defaultCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="step">
                {selectedCategory && selectedCategory !== "기타" ? (
                  <select
                    value={selectedIngredient}
                    onChange={(e) => setSelectedIngredient(e.target.value)}
                  >
                    <option value="">재료 선택</option>
                  </select>
                ) : selectedCategory === "기타" ? (
                  <input
                    type="text"
                    placeholder="재료 이름 입력"
                    value={customIngredient}
                    onChange={(e) => setCustomIngredient(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    placeholder="카테고리 먼저 선택하기"
                    disabled
                  />
                )}
              </div>

              <div className="step">
                <input
                  type="text"
                  placeholder="예: 한 단, 500g"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>

              <button type="submit" className="add-button">
                재료 추가하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
