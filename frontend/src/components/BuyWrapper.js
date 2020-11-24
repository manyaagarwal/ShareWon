import React from "react";
import ReactDOM from "react-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Buy } from "./Buy";
import { BuyCheckout } from "./BuyCheckout";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.STRIPE_PUBLIC_KEY);

export default function BuyWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <BuyCheckout />
    </Elements>
  );
}

