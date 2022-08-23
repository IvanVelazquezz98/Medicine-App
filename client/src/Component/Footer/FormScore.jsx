import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { createComment} from '../../Redux-actions';
import { useDispatch } from 'react-redux';
import ModalMesage from './ModalMesage'

export default function FormScore({userEmail}) {
  const [show, setShow] = useState(true);
  const [score, setScore] = useState({
    score:'',
    text:'',
    userEmail:userEmail
  })
  const [mesage , setMesage] = useState(false)

  const dispatch = useDispatch()
  
  function handleChange(e) {
    e.preventDefault();
    setScore({
        ...score,
        [e.target.name]: e.target.value,
    });
}
    console.log('form' ,score)

const handleSubmit = () => {
    let payload = {
        comments:score.text,
        rating:score.score,
        userEmail:score.userEmail
    }
    dispatch(createComment(payload))
    setMesage(true)
}

  const handleClose = () => {
    setShow(false)
  };

  const handleCancel = () => {
    setShow(false)

  }


  return (
    <>

    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
            🤗 PUNTUANOS 🤗
            </Modal.Title>
        </Modal.Header>
        <br></br>

        <form>
            <div class="form-group">
                <label for="exampleFormControlSelect1">Puntaje *10 Excelente *1 Muy malo</label>
                <select name='score' class="form-control" id="exampleFormControlSelect1"
                    onChange={(e) => handleChange(e)}>
                    <option >...</option>
                    <option value={10}>10</option>
                    <option value={9}>9</option>
                    <option value={8}>8</option>
                    <option value={7}>7</option>
                    <option value={6}>6</option>
                    <option value={5}>5</option>
                    <option value={4}>4</option>
                    <option value={3}>3</option>
                    <option value={2}>2</option>
                    <option value={1}>1</option>
                </select>
            </div>
            <br></br>
            <div class="form-group">
                <label for="exampleFormControlTextarea1">Nota extra</label>
                <textarea name='text' class="form-control"
                 id="exampleFormControlTextarea1" rows="3" onChange={(e) => handleChange(e)}></textarea>
            </div>
            <br></br>
            <Button variant="primary" onClick={handleSubmit}>
                Puntuar
            </Button>
        </form>
    {mesage ? <ModalMesage/> : null}

    </Modal>

</>
);
}