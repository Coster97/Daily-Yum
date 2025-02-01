// ✅ Firebase SDK 불러오기
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// ✅ Firebase 설정 정보
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

// ✅ Firebase 앱 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

// ✅ 구글 로그인 함수
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // ✅ Firestore에 사용자 정보 저장
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      // ✅ 새로운 사용자라면 Firestore에 저장
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      });
    }

    console.log("✅ 로그인 성공!", user);
  } catch (error) {
    console.error("🚨 로그인 오류:", error.message);
  }
};

// ✅ 로그아웃 함수
const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ 로그아웃 성공!");
  } catch (error) {
    console.error("🚨 로그아웃 오류:", error.message);
  }
};

// ✅ 필요한 모듈 내보내기
export { auth, provider, signInWithGoogle, logout, db };
export default app;
