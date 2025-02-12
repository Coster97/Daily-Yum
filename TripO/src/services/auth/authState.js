import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";

// ✅ Firebase 로그인 상태 감지
const checkAuthState = (setUser, navigate) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("✅ 로그인된 사용자:", user);
      setUser(user);
    } else {
      console.log("🚨 로그인되지 않음");
      setUser(null);
    }
  });
};

export default checkAuthState;
