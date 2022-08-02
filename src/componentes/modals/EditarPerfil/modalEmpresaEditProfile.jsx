import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../../service/api.js";

export const ModalEmpresaEditProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [codigo, setCodigo] = useState("");
  const [atividade, setAtividade] = useState("");
  let dados = {
    nome: atividade,
    codigo: codigo,
  };

  function enviarDados() {
    if (codigo === "" || atividade === ""){
      return
    }
    api.post(`/atividadeEconomica`, dados);
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
            
            top: "23.3vh",
            right: "12vw",
            color: "#51B5C5",
          }}
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>
      </a>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar nova atividade</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Código"
                autoFocus
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                type="email"
                placeholder="Cadastrar nova atividade"
                autoFocus
                value={atividade}
                onChange={(e) => setAtividade(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
                enviarDados();
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
            CADASTRAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
