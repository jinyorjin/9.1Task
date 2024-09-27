import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth"; // 로그인 상태 변경 확인
import { auth, db } from "./utilis/firebase"; // Firebase 초기화된 auth, db 가져오기
import ThemeSelector from "./ThemeSelector";

function PremiumContent() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Firestore에서 사용자의 프리미엄 여부 확인
        try {
          const userRef = doc(db, "users", user.uid); // Firestore에서 사용자 문서 가져오기
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            const userData = userDoc.data(); // 사용자 데이터 가져오기
            const isPremium = userData.premium || false; // premium 필드 확인
            setIsPremium(isPremium);
          } else {
            console.error("No such document!");
            setError("No user data found. Please log in again.");
          }
        } catch (error) {
          console.error("Error checking subscription:", error);
          setError("Failed to check subscription. Please try again later.");
        } finally {
          setLoading(false); // 로딩 상태 해제
        }
      } else {
        console.error("No user found.");
        setError("No user is logged in.");
        setLoading(false); // 로딩 상태 해제
      }
    });

    return () => unsubscribe(); // 컴포넌트 언마운트 시 구독 해제
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Welcome to the Premium Content Area</h1>

      {isPremium ? (
        <div>
          <h2>Premium Features</h2>
          <div className="messages-banners">
            <h3>Messages and Banners</h3>
            <p>Create custom banners for your profile or pages.</p>
            <input
              type="text"
              placeholder="Enter your custom message"
              className="banner-input"
            />
          </div>

          <ThemeSelector isPremium={isPremium} />

          <div className="content-controls">
            <h3>Content Controls</h3>
            <p>
              Manage your content visibility and customize how users interact
              with your posts.
            </p>
          </div>

          <div className="analytics-dashboard">
            <h3>Analytics Dashboard</h3>
            <p>Track visitor engagement and performance of your posts.</p>
          </div>
        </div>
      ) : (
        <p>Please upgrade to access these premium features.</p>
      )}
    </div>
  );
}

export default PremiumContent;
