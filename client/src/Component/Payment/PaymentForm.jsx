import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import './Payment.css'

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "blue",
      color: "black",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

export default function PaymentForm({price}) {
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  //modal Elements
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post("http://localhost:3001/payment", {
          amount: 1000000 ,
          id,
          currency: "ars",
			    description: "Turno con Pepito",
        });

        if (response.data.success) {
          console.log("Successful payment");
          setSuccess(true);
        }
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <>
      <Button variant="danger" size="sm" onClick={handleShow}>
        Pagar
      </Button>
      <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Método de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!success ? (
            <form onSubmit={handleSubmit}>
              <CardElement options={CARD_OPTIONS} />
              
            </form>
          ) : (
            <div>
              <h2>Su pago ha sido procesado exitosamente</h2>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
        
          <Button variant="secondary" size="sm" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" size="sm" onClick={handleSubmit}>
           Pagar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
