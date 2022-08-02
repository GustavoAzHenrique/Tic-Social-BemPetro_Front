import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../../service/api.js";

export const ModalPessoaCadastro = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePost = () => setShow(true);
  const [perfilPessoa, setperfilPessoa] = useState();
  let dados = {
    perfil: perfilPessoa,
  };

  function enviarDados() {
    if (perfilPessoa === "" ){
      return
    }
    api.post(`/perfilPessoa`, dados);
  }

  return (
    <>
      <a style={{ color: "#51B5C5" }} onClick={handleShow}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="25px"
          fill="currentColor"
          class="bi bi-plus-circle"
          viewBox="0 0 16 16"
          style={{
            position: "relative",
            right: "12vw",
            bottom: "5.6vw",

            color: "#51B5C5",
          }}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Cadastrar novo perfil"
                autoFocus
                name="perfil"
                value={perfilPessoa}
                onChange={(e) => setperfilPessoa(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="primary"
            onClick={() => {
              enviarDadosModal();
              handleClose();
            }}
            style={{
              position: "relative",
              right: "10rem",
              width: "10rem",
              borderRadius: "50.35px",
              color: "#ffffff",
              backgroundColor: "#51B5C5",
              border: "#51B5C5",
              
            }}
          >
            Cadastrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
