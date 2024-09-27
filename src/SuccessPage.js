import React from "react";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/premium-content");
  };

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Thank you for subscribing to the premium plan.</p>
      <button onClick={handleRedirect}>Go to Premium Content</button>
    </div>
  );
};

export default SuccessPage;
