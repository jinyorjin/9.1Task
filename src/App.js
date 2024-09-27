import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Homepage";
import LoginPage from "./routes/Login";
import SignupPage from "./routes/Signup";
import PaymentPage from "./PaymentPage";
import SuccessPage from "./SuccessPage";
import PricingPlanPage from "./routes/PricingPlanPage";
import PremiumContent from "./PremiumContent";
import { UserProvider } from "./UserContext"; // Import UserProvider

function App() {
  return (
    <UserProvider>
      <Router>
        <div>
          <Routes>
            {/* 홈 페이지 */}
            <Route path="/" element={<HomePage />} />

            {/* 회원가입 페이지 */}
            <Route path="/signup" element={<SignupPage />} />

            {/* 로그인 페이지 */}
            <Route path="/login" element={<LoginPage />} />

            {/* 결제 페이지 */}
            <Route path="/payment" element={<PaymentPage />} />

            {/* 결제 성공 페이지 */}
            <Route path="/success" element={<SuccessPage />} />

            {/* 가격 계획 페이지 */}
            <Route path="/PricingPlanPage" element={<PricingPlanPage />} />

            {/* 프리미엄 콘텐츠 페이지 */}
            <Route path="/premium-content" element={<PremiumContent />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
