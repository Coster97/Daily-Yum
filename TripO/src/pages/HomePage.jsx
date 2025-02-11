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

  const ingredientMap = {
    "야채/채소": [
      "대파",
      "양파",
      "쪽파",
      "마늘",
      "당근",
      "감자",
      "고구마",
      "브로콜리",
      "애호박",
      "청경채",
      "배추",
      "상추",
      "깻잎",
      "시금치",
      "부추",
      "콩나물",
      "숙주나물",
      "무",
      "피망",
      "파프리카",
      "가지",
      "오이",
      "토마토",
      "비트",
      "아스파라거스",
      "미나리",
      "연근",
      "우엉",
      "샐러리",
    ],
    과일: [
      "사과",
      "배",
      "바나나",
      "귤",
      "포도",
      "복숭아",
      "자두",
      "블루베리",
      "딸기",
      "체리",
      "파인애플",
      "망고",
      "키위",
      "레몬",
      "라임",
      "수박",
      "멜론",
      "석류",
      "코코넛",
      "무화과",
      "용과",
      "감",
      "유자",
      "대추",
      "아보카도",
    ],
    육류: [
      "소고기",
      "돼지고기",
      "닭고기",
      "오리고기",
      "양고기",
      "말고기",
      "칠면조",
      "베이컨",
      "소시지",
      "스테이크용 소고기",
      "갈비",
      "삼겹살",
      "등심",
      "안심",
      "목살",
      "닭가슴살",
      "닭다리",
      "닭봉",
      "훈제오리",
      "햄",
      "양갈비",
    ],
    해산물: [
      "새우",
      "연어",
      "오징어",
      "문어",
      "조개",
      "가리비",
      "홍합",
      "바지락",
      "미역",
      "다시마",
      "멸치",
      "고등어",
      "갈치",
      "참치",
      "전복",
      "장어",
      "굴",
      "꽃게",
      "대게",
      "킹크랩",
      "랍스터",
      "송어",
      "청어",
      "방어",
      "노르웨이 고등어",
    ],
    "계란/유제품": [
      "계란",
      "우유",
      "치즈",
      "버터",
      "요거트",
      "크림치즈",
      "생크림",
      "체다치즈",
      "모짜렐라치즈",
      "고다치즈",
      "리코타치즈",
      "그릭요거트",
      "파마산치즈",
      "카망베르치즈",
      "브리치즈",
      "코티지치즈",
      "사워크림",
    ],
    가공식품: [
      "햄",
      "소시지",
      "베이컨",
      "어묵",
      "스팸",
      "훈제 닭가슴살",
      "핫도그",
      "참치캔",
      "옥수수콘",
      "삶은 계란",
      "크래커",
      "라면",
      "컵라면",
      "떡볶이떡",
      "만두",
      "냉동피자",
      "냉동볶음밥",
      "냉동 치킨너겟",
      "냉동 감자튀김",
    ],
  };

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
          {/* ✅ 카테고리 카드 컨테이너 */}
          <div className="category-list">
            {[
              { name: "야채/채소", image: "/assets/vegetable.jpg" },
              { name: "과일", image: "/assets/fruit.jpg" },
              { name: "육류", image: "/assets/meat.jpg" },
              { name: "해산물", image: "/assets/seafood.jpg" },
              { name: "계란/유제품", image: "/assets/dairy.jpg" },
              { name: "가공식품", image: "/assets/processed.jpg" },
              { name: "기타", image: "/assets/etc.jpg" },
            ].map((category, index) => (
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
                  {selectedCategory &&
                    ingredientMap[selectedCategory]?.map(
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
                    {selectedCategory &&
                      ingredientMap[selectedCategory]?.map(
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
  );
};

export default HomePage;
