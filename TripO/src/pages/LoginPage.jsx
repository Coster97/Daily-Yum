import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* 헤더 */}
      <header className="w-full text-center bg-blue-500 text-white py-4">
        <h1 className="text-2xl font-bold">TripO</h1>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex flex-col items-center justify-center flex-1 w-full max-w-md bg-white p-4 rounded-lg shadow-md">
        <p className="text-lg text-gray-800 mb-6">
          전국 추천 여행지와 맛집을 한눈에!
        </p>

        {/* 버튼 그룹 */}
        <div className="button-container">
          <button className="signup-btn px-4 py-2 text-white rounded w-4/5">
            카카오로 시작하기
          </button>
          <button className="signup-btn px-4 py-2 text-white rounded w-4/5">
            구글로 시작하기
          </button>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="w-full text-center bg-blue-500 text-white py-2">
        <p>© 2025 TripO</p>
      </footer>
    </div>
  );
};

export default LoginPage;
