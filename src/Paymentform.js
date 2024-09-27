import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const backendUrl =
      process.env.REACT_APP_BACKEND_URL || window.location.origin;

    const response = await fetch(`${backendUrl}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }),
    });

    const { clientSecret } = await response.json();

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setErrorMessage(error.message);
      setPaymentSuccess(false);
    } else if (paymentIntent.status === "succeeded") {
      setPaymentSuccess(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Payment
      </button>
      {paymentSuccess !== null &&
        (paymentSuccess ? (
          <p>Pay successful!</p>
        ) : (
          <p>Pay failed: {errorMessage}</p>
        ))}
    </form>
  );
}

export default PaymentForm;
