import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { deleteByAdmin, forgivenByAdmin, designeAdmin, degredeAdmin } from "../../Redux-actions/index.js";
import { modalProfessionalApps } from "../../Redux-actions/index.js";

export default function ModalOptions(params) {
    const [show, setShow] = useState(true);
    console.log(params,"soyparams");

    const dispatch = useDispatch()

    const handleClose = () => {
        setShow(false)
        dispatch(modalProfessionalApps(false))
    };

 
    function handleDelete(){
        
        dispatch(deleteByAdmin(params.params.id))
        dispatch(modalProfessionalApps(false))
      }
      function handleForgive(){
       
        dispatch(forgivenByAdmin(params.params.row.Mail))
        dispatch(modalProfessionalApps(false))
      }
      
      function handleDesigneAdmin(){
        
        dispatch(designeAdmin(params.params.id))
        dispatch(modalProfessionalApps(false))
      }
      function handleDegredeAdmin(){
       
        dispatch(degredeAdmin(params.params.id))
        dispatch(modalProfessionalApps(false))
      }
      


    return (
        <>
            
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Opciones {params.params.row?.Nombre}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                {params.params.row?.eliminado=== true?
                <Button variant="secondary" onClick={handleForgive}>
                Restaurar Usuario
            </Button>: 
                    <Button variant="secondary" onClick={handleDelete}>
                        Eliminar 
                    </Button>
            }
                    {params.params.row?.rol==="admin" ? 
                    <Button variant="secondary" onClick={handleDegredeAdmin}>
                        Rol Usuario
                    </Button>:
                    <Button variant="secondary" onClick={handleDesigneAdmin}>
                        Rol Admin
                    </Button>
                
                    }
                        
                </Modal.Footer>
            </Modal>
        </>
    );
}