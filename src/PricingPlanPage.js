import React from "react";
import { Link } from "react-router-dom";

const PricingPlanPage = () => {
  return (
    <div>
      <h2>Our Plans</h2>
      <div className="plan-container">
        <div className="plan">
          <h3>Free Plan</h3>
          <p>Basic features</p>
        </div>
        <div className="plan premium">
          <h3>Premium Plan</h3>
          <p>Advanced features like themes, content control, and analytics.</p>
          <Link to="/payment">
            <button>Choose Premium</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPlanPage;
