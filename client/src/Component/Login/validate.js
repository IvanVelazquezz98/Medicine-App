
import Modal from 'react-bootstrap/Modal';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
export function validate(post) {

  let errors = {}
  post.name
    ? (errors.name = "")
    : (errors.name) = "Necesitas llenar el campo nombre!"

  post.email
    ? (errors.email = "")
    : (errors.email = "Necesitas llenar el campo email!")

  post.password
    ? (errors.password = "")
    : (errors.password = "Necesitas llenar el campo contraseña!")

  post.dateOfBirth
    ? (errors.dateOfBirth = "")
    : (errors.dateOfBirth = "Necesitas llenar el campo fecha de nacimiento!")

  post.identification
    ? (errors.identification = "")
    : (errors.identification = "Necesitas llenar el campo indentificacion!")


  post.country
    ? (errors.country = "")
    : (errors.country = "Necesitas llenar el campo de pais!")

  post.city
    ? (errors.city = "")
    : (errors.city = "Necesitas llenar el campo de ciudad!")

  post.address
    ? (errors.address = "")
    : (errors.address = "Necesitas llenar el campo de direccion!")

  post.province
    ? (errors.province = "")
    : (errors.province = "Necesitas llenar el campo de provincia/estado!")

  post.phone
    ? (errors.phone = "")
    : (errors.phone = "Necesitas llenar el campo de numero telefonico!")

  post.rol
    ? (errors.rol = "")
    : (errors.rol = "Necesitas llenar el campo de rol!")

  post.medicalLicense
    ? (errors.rol = "")
    : (errors.licenceImage = "Necesitas llenar el campo de imagen de licencia!")

  return errors
}

export function validateProfessional(postprofessional) {
  let professionalError = {}

  postprofessional.medicalLicense
    ? (professionalError.medicalLicense = "")
    : (professionalError.medicalLicense = "Necesitas llenar el campo de Licencia medica!")

  return professionalError
}









