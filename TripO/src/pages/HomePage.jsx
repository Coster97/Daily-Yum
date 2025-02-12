import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { db, auth } from "../services/firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import "../styles/Ingredient.css";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]); // ✅ Firestore에서 불러올 데이터

  const defaultCategories = [
    { name: "야채/채소", image: "/assets/vegetable.jpg" },
    { name: "과일", image: "/assets/fruit.jpg" },
    { name: "육류", image: "/assets/meat.jpg" },
    { name: "해산물", image: "/assets/seafood.jpg" },
    { name: "계란/유제품", image: "/assets/dairy.jpg" },
    { name: "가공식품", image: "/assets/processed.jpg" },
    { name: "기타", image: "/assets/etc.jpg" },
  ];

  const ingredientMap = {
    "야채/채소": ["대파", "양파", "당근"],
    과일: ["사과", "배", "바나나"],
    육류: ["소고기", "돼지고기", "닭고기"],
    해산물: ["새우", "연어", "오징어"],
    "계란/유제품": ["계란", "우유", "치즈"],
    가공식품: ["햄", "소시지", "베이컨"],
  };

  // ✅ Firestore에서 실시간 데이터 가져오기
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ingredientsRef = collection(db, `users/${user.uid}/ingredients`);
    const unsubscribe = onSnapshot(ingredientsRef, (snapshot) => {
      setIngredients(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    });

    return () => unsubscribe();
  }, []);

  // ✅ Firestore에 재료 추가하기
  const addIngredient = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("로그인이 필요합니다!");

      await addDoc(collection(db, `users/${user.uid}/ingredients`), {
        name:
          selectedCategory === "기타" ? customIngredient : selectedIngredient,
        category: selectedCategory,
        amount,
      });

      alert("재료가 성공적으로 추가되었습니다!");
      setIsModalOpen(false);
    } catch (error) {
      console.error("❌ 재료 추가 실패:", error);
    }
  };

  return (
    <div className="ingredient-div">
      <Header />

      <div className="ingredient-flex-div">
        {/* ✅ 냉장고 영역 */}
        <div className="fridge-section">
          <h3>내 냉장고</h3>

          {/* ✅ 기존의 카테고리 카드 유지 */}
          <div className="category-list">
            {defaultCategories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                style={{ backgroundImage: `url(${category.image})` }}
              >
                <div className="category-overlay">{category.name}</div>
              </div>
            ))}
          </div>
          <button
            className="add-ingredient-btn"
            onClick={() => setIsModalOpen(true)}
          >
            +
          </button>
        </div>

        {/* ✅ 세로 구분선 */}
        <div className="divider"></div>

        {/* ✅ 재료 추가 폼 (PC에서만 보임) */}
        <div className="ingredient-form desktop-only">
          <h3>재료를 추가해보세요.</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addIngredient();
            }}
          >
            <div className="step">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                {defaultCategories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
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
                  {ingredientMap[selectedCategory]?.map((ingredient, index) => (
                    <option key={index} value={ingredient}>
                      {ingredient}
                    </option>
                  ))}
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
        {/* ✅ "페이지 같은" 모달 (모바일에서만 보임) */}
        {isModalOpen && (
          <div className="modal-page">
            <div className="modal-header">
              <button
                className="back-button"
                onClick={() => setIsModalOpen(false)}
              >
                <FaArrowLeft size={20} />
              </button>
            </div>
            <div className="modal-body">
              <h3>재료 추가</h3>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addIngredient();
                }}
              >
                <div className="step">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="">카테고리 선택</option>
                    {defaultCategories.map((category, index) => (
                      <option key={index} value={category.name}>
                        {category.name}
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
                      {ingredientMap[selectedCategory]?.map(
                        (ingredient, index) => (
                          <option key={index} value={ingredient}>
                            {ingredient}
                          </option>
                        )
                      )}
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
    </div>
  );
};

export default HomePage;
