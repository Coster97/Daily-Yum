import { signInWithPopup, signOut } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, provider, db } from "./firebaseConfig";

// ✅ Google 로그인 실행 (팝업 방식)
const signInWithGoogle = async () => {
  try {
    console.log("🔄 Google 로그인 시도 중...");
    const result = await signInWithPopup(auth, provider);
    console.log("✅ 로그인 성공! 사용자:", result.user);

    // ✅ Firestore에 사용자 정보 저장
    await saveUserToFirestore(result.user);

    return result.user;
  } catch (error) {
    console.error("🚨 로그인 오류 발생:", error.message);
  }
};

// ✅ Firestore에 사용자 정보 저장
const saveUserToFirestore = async (user) => {
  try {
    console.log("🟢 Firestore에 사용자 저장 시도... UID:", user.uid);
    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: new Date(),
      },
      { merge: true }
    );

    console.log("✅ Firestore 저장 성공!");
  } catch (error) {
    console.error("🚨 Firestore 저장 오류 발생:", error.message);
  }
};

// ✅ 로그아웃 기능
const logout = async () => {
  try {
    await signOut(auth);
    console.log("✅ 로그아웃 성공!");
  } catch (error) {
    console.error("🚨 로그아웃 오류:", error.message);
  }
};

export { signInWithGoogle, logout };
