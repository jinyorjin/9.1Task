import { useNavigate } from "react-router-dom";
import "./PricingPlanPage.css";

const PricingPlanPage = () => {
  const navigate = useNavigate();

  const navigateToPayment = () => {
    navigate("/payment");
  };

  return (
    <div className="pricing-container">
      <h2 className="pricing-title">Our Plans</h2>
      <div className="pricing-cards">
        <div className="pricing-card">
          <h3>Free Plan</h3>
          <p>Basic features</p>
        </div>
        <div className="pricing-card premium">
          <h3>Premium Plan</h3>
          <p>Advanced features like themes, content control, and analytics.</p>
          <button className="btn-primary" onClick={navigateToPayment}>
            Choose Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPlanPage;
