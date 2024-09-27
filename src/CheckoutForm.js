import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      console.log("PaymentMethod created:", paymentMethod);
      setSuccessMessage("Payment successful!");
      setErrorMessage("");
      setLoading(false);
      window.location.href = "/success";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2 className="form-title">Payment for Premium Plan</h2>
      <div className="card-input">
        <CardElement className="card-element" />
      </div>
      <button
        type="submit"
        disabled={!stripe || loading}
        className="submit-button"
      >
        {loading ? "Processing..." : "Pay"}
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}{" "}
      {"Success"}
    </form>
  );
};

export default CheckoutForm;
