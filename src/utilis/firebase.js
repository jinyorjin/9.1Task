import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChBSpWf-_4xddg_1HzO9INRv2pDAVswDg",
  authDomain: "task7p-f3b02.firebaseapp.com",
  projectId: "task7p-f3b02",
  storageBucket: "task7p-f3b02.appspot.com",
  messagingSenderId: "680219586873",
  appId: "1:680219586873:web:2c041dddd84849c7e5b8e8",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth }; // Firestore 함수들을 내보내기
