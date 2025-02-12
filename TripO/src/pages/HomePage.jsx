import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { db, auth } from "../services/firebaseConfig";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import Header from "../components/Header";
import "../styles/Ingredient.css";
import fetchCategoryIngredients from "../services/refrigerator/fetchCategory";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [selectedMenuCategory, setSelectedMenuCategory] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [customIngredient, setCustomIngredient] = useState("");
  const [amount, setAmount] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [ingredients, setIngredients] = useState([]); // ✅ Firestore에서 불러올 데이터
  const [fridgeItems, setFridgeItems] = useState([]); // ✅ 불러온 재료 저장

  const defaultCategories = [
    "전체",
    "야채/채소",
    "과일",
    "육류",
    "해산물",
    "계란/유제품",
    "가공식품",
    "기타",
  ];

  const menuCategories = [
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

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ingredientsRef = collection(db, `users/${user.uid}/ingredients`);
    const unsubscribe = onSnapshot(ingredientsRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setIngredients(data);
      setFridgeItems(data); // ✅ 처음에는 전체 데이터 표시
    });

    return () => unsubscribe();
  }, []);

  // ✅ Firestore에 재료 확인하기
  const viewIngredients = async (category) => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("로그인이 필요합니다!");
      setSelectedCategory(category);
      // ✅ 이미 정의된 fetchCategoryIngredients 함수 호출
      const ingredients = await fetchCategoryIngredients(category);
      if (ingredients) {
        setFridgeItems(ingredients); // ✅ 불러온 재료 상태 업데이트
      }
    } catch (error) {
      console.error("❌ 재료 확인 실패:", error);
    }
  };

  const addIngredient = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("로그인이 필요합니다!");

      // ✅ 필수 입력값 검증
      if (!selectedMenuCategory) {
        alert("카테고리를 선택해주세요!");
        return;
      }

      if (!selectedIngredient && selectedMenuCategory !== "기타") {
        alert("재료를 선택해주세요!");
        return;
      }

      if (!customIngredient && selectedMenuCategory === "기타") {
        alert("재료 이름을 입력해주세요!");
        return;
      }

      if (!amount.trim()) {
        alert("수량을 입력해주세요!");
        return;
      }

      await addDoc(collection(db, `users/${user.uid}/ingredients`), {
        name:
          selectedMenuCategory === "기타"
            ? customIngredient
            : selectedIngredient,
        category: selectedMenuCategory,
        amount,
      });

      alert("재료가 성공적으로 추가되었습니다!");
      setSelectedMenuCategory("");
      setCustomIngredient("");
      setSelectedIngredient("");
      setAmount("");
      window.scrollTo(0, 0);
      setIsAddModalOpen(false);
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
          <div className="category-list">
            {defaultCategories.map((category) => (
              <div
                onClick={() => viewIngredients(category)}
                className={`category-card ${
                  selectedCategory === category ? "active" : ""
                }`}
              >
                {category}
              </div>
            ))}
          </div>
          <div className="ingredients-list">
            {fridgeItems.length > 0 ? (
              fridgeItems.map((item) => (
                <div className="ingredient-items" key={item.id}>
                  {item.name} - {item.amount}
                </div>
              ))
            ) : (
              <p>이 카테고리에 저장된 재료가 없습니다.</p>
            )}
          </div>
          <button
            className="add-ingredient-btn"
            onClick={() => setIsAddModalOpen(true)}
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
                value={selectedMenuCategory}
                onChange={(e) => setSelectedMenuCategory(e.target.value)}
              >
                <option value="">카테고리 선택</option>
                {menuCategories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="step">
              {selectedMenuCategory && selectedMenuCategory !== "기타" ? (
                <select
                  value={selectedIngredient}
                  onChange={(e) => setSelectedIngredient(e.target.value)}
                >
                  <option value="">재료 선택</option>
                  {ingredientMap[selectedMenuCategory]?.map(
                    (ingredient, index) => (
                      <option key={index} value={ingredient}>
                        {ingredient}
                      </option>
                    )
                  )}
                </select>
              ) : selectedMenuCategory === "기타" ? (
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
        {isAddModalOpen && (
          <div className="modal-page">
            <div className="modal-header">
              <button
                className="back-button"
                onClick={() => setIsAddModalOpen(false)}
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
                    value={selectedMenuCategory}
                    onChange={(e) => setSelectedMenuCategory(e.target.value)}
                  >
                    <option value="">카테고리 선택</option>
                    {menuCategories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="step">
                  {selectedMenuCategory && selectedMenuCategory !== "기타" ? (
                    <select
                      value={selectedIngredient}
                      onChange={(e) => setSelectedIngredient(e.target.value)}
                    >
                      <option value="">재료 선택</option>
                      {ingredientMap[selectedMenuCategory]?.map(
                        (ingredient, index) => (
                          <option key={index} value={ingredient}>
                            {ingredient}
                          </option>
                        )
                      )}
                    </select>
                  ) : selectedMenuCategory === "기타" ? (
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
