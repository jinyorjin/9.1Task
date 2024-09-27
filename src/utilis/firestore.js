import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase"; // Firebase 초기화된 db 가져오기

// 결제 성공 시 Firestore 업데이트
export const handlePaymentSuccess = async (customerId) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser; // 현재 로그인된 사용자 정보 가져오기

    if (user) {
      // Firestore에서 현재 사용자의 UID로 문서 참조 가져오기
      const userRef = doc(db, "users", user.uid);

      // Firestore 문서에 customerId와 premium 상태 업데이트
      await updateDoc(userRef, {
        customerId: customerId, // 결제 후 받아온 Stripe customerId
        premium: true, // 프리미엄 상태를 true로 설정
      });

      console.log("Payment success! Customer ID and premium status updated.");
    } else {
      console.error("No user is logged in.");
    }
  } catch (error) {
    console.error("Error updating Firestore:", error);
  }
};

// 사용자 데이터를 Firestore에서 불러오기
export const fetchUserData = async (uid) => {
  try {
    // Firestore에서 사용자의 UID를 기준으로 문서 참조 가져오기
    const userRef = doc(db, "users", uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data(); // 사용자 데이터 가져오기
      console.log("User data:", userData);

      // userData에서 premium 상태 확인
      return userData.premium || false;
    } else {
      console.error("No such document!");
      return false;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return false;
  }
};
