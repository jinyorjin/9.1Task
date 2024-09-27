import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { handlePaymentSuccess } from "./utilis/firestore";

// Log the publishable key for Stripe
console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// Load Stripe with the publishable key from the environment variables
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const PaymentPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [user, setUser] = useState({
    email: "user@example.com",
    uid: "sampleUID",
  }); // 예시 사용자 정보 (실제 사용자 정보를 가져오는 방식으로 수정 필요)

  // Function to handle Stripe payment completion
  const handlePayment = async (paymentMethodId) => {
    try {
      // Assuming this is a mock or test customer ID received from Stripe after the payment
      const stripeCustomerId = paymentMethodId;

      // Calling the handlePaymentSuccess function to update Firestore with customerId and premium status
      await handlePaymentSuccess(stripeCustomerId);

      // Set payment success state
      setPaymentSuccess(true);
      console.log("Payment successful, updating Firestore...");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  // Fetch to create a customer in Firestore after payment is successful
  useEffect(() => {
    if (paymentSuccess) {
      fetch("/create-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email, // 사용자 이메일
          uid: user.uid, // 사용자 UID
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Customer created:", data.customerId);
          window.location.href = "/premium-content";
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [paymentSuccess, user]);

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onPaymentSuccess={handlePayment} />
    </Elements>
  );
};

export default PaymentPage;
