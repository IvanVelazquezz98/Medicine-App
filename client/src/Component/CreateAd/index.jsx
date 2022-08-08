import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postAdd } from "../../Redux-actions";
import { getUsersById } from "../../Redux-actions";
import firebaseApp from "../../Credential/index";
import { getAuth, signOut } from "firebase/auth";
import {useNavigate} from 'react-router-dom'
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./CreateAd.css";
const auth = getAuth(firebaseApp);
//b
export default function CreateAd({ user }) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.userDetail);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsersById(user.email));
  }, [dispatch]);

  function handleChange(e) {
    e.preventDefault();
    setPost({
      ...post,
      [e.target.name]: e.target.value,
      professionalMedicalLicense: User.professional?.medicalLicense,
    });
  }

  const [post, setPost] = useState({
    specialty: "",
    price: "",
    timeAvailability: "",
    serviceType: "",
  });

  function handleSubmit(e) {
    
    dispatch(postAdd(post));
    alert("Add Created");
    setPost({
      specialty: "",
      price: "",
      timeAvailability: "",
      serviceType: "",
      professionalMedicalLicense: "",
    });
    navigate('/services')
  }

  return (
    <div>
      <div>
        <Form onSubmit={handleSubmit} className="formContainer mb-2">
          <Form.Group className="mb-3">
            <Form.Label>Especialidad: </Form.Label>
            <Form.Control
              type="text"
              id="specialty"
              name="specialty"
              value={post.specialty}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio: </Form.Label>
            <Form.Control
              type="text"
              id="price"
              name="price"
              value={post.price}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Turnos disponibles: </Form.Label>
            <Form.Control
              type="text"
              id="timeAvailability"
              name="timeAvailability"
              value={post.timeAvailability}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Tipo de servicio: </Form.Label>
            <Form.Control
              type="text"
              id="serviceType"
              name="serviceType"
              value={post.serviceType}
              onChange={(e) => handleChange(e)}
            />
          </Form.Group>

          <div className="registerNforgottenButtons">

            
            <Button
              variant="info"
              size="sm"
              type="submit"
              onClick={() => handleSubmit()}
            >
              CREAR ANUNCIO
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
