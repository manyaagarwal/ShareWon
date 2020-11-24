import { Button, message } from "antd";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import CardSection from "./CardSelection";
import { Redirect, useLocation } from "react-router-dom";

export const BuyCheckout = () => {
  const stripe = useStripe();
  const elements = useElements();
  const location = useLocation();

  const { amount } = location.state;
  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const data = {
      user_id: 1, // TODO: this is test id and needs to be replaced from the current user's id
      transaction_address: "", //TODO: This can possibly be removed from the backend
      amount: amount * 100,
      currency: "USD",
    };
    const response = await fetch("http://localhost:3001/buy-sharewon", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const intent = await response.json();
    console.log(intent);
    const result = await stripe.confirmCardPayment(intent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "Jenny Rosen",
        }, // TODO: to be replaced with billing details of the user
      },
    });

    if (result.error) {
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message);
      message.error("Payment could not be processed");
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("It was a success");
        message.success("Payment Done Successfully!");
        //TODO: Transfer ShareWon to the User
        return <Redirect to="/" />;
      }
    }
  };
  return (
    <>
      <CardSection />
      <Button type="primary" onClick={handleSubmit}>
        Buy
      </Button>
    </>
  );
};
