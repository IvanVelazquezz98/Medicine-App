import React, { useState } from "react";
import doc from "../../assets/doc.webp";
import PaymentForm from "../Payment/PaymentForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const Public_key =
  "pk_test_51LVdCCCRRZtIMaInvriUmPwPaAIa7kdO8QSZQoycHf6sKziNdhxZNwrBdZ8LZSq0a7uKnopXPRFOGsmekwo7EEmA00yQmCRx28";

const stripeTestPromise = loadStripe(Public_key);

function ModalPayment() {
  
  return (
    <div>
      <h3>$10.00</h3>
      <img src={doc} alt="Doc" />
      <Elements stripe={stripeTestPromise}>
        <PaymentForm />
      </Elements>
    </div>

   
  );
}

export default ModalPayment;
