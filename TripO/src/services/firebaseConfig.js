import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCiDXUWJZMAazADxgvjIBjmKvGxN3mZQzQ",
  authDomain: "tripo-949ae.firebaseapp.com",
  projectId: "tripo-949ae",
  storageBucket: "tripo-949ae.appspot.com",
  messagingSenderId: "578776380302",
  appId: "1:578776380302:web:1f7d31a16f99dd9ad5eadf",
};

// ✅ Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, storage, db };
export default app;
