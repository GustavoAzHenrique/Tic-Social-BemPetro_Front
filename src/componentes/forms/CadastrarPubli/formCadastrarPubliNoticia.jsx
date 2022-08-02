import React, { useState, useContext } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext/index.jsx";
import { useForm } from "react-hook-form";
import { Container, BtnAddImag } from "./style.jsx";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import { IMaskInput } from "react-imask";

export const FormCadastrarPubliNoticia = () => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [imagemSecundaria, setImagemSecundaria] = useState("");
  const [subtitulo, setSubTitulo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);
  const [showModal4, setShowModal4] = useState(false);

  const navigate = useNavigate();

  const { btnCadastrar, modalIcon, btnSquare } = useContext(ThemeContext);
  let dados = {
    nome: titulo,
    subTitulo: subtitulo,
    conteudo: conteudo,
    imagemPrimaria: imagemPrincipal,
    imagemSecundaria: imagemSecundaria,
  };

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const { token } = useContext(AuthContext);

  function enviarDados() {
    if (!validate()) return;
    api.post(`/noticia`, dados, { headers: { Authorization: token } });
    handleShowModal4();
  }

  function validate() {
    if (!dados.nome)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Titulo!",
      });
    if (!dados.subTitulo)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo subTitulo!",
      });
    if (!dados.conteudo)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Conteudo!",
      });
    if (!dados.imagemPrimaria)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Imagem Principal!",
      });
    if (!dados.imagemSecundaria)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Imagem Secundária!",
      });

    return true;
  }

  const { register, handleSubmit, setValue } = useForm();

  return (
    <>
      {/* <div style={{ display: "flex", flexDirection: "column", width: "100%" }}> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        {status.type === "error" ? (
          <p
            style={{
              color: "#ff0000",
            }}
          >
            {status.mensagem}
          </p>
        ) : (
          ""
        )}
      </div>
      <Form className=" mt-4 w-100 d-flex align-items-center justify-content-center">
        <Form.Group className="mb-5 w-50">
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Título*"
            as={IMaskInput}
            maxLength="25"
            autoFocus={true}
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"            
            as={IMaskInput}
            maxLength="50"
            placeholder="Subtítulo*"
            onChange={(e) => setSubTitulo(e.target.value)}
            value={subtitulo}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"
            as={IMaskInput}
            maxLength="200"
            placeholder="Conteúdo*"
            onChange={(e) => setConteudo(e.target.value)}
            value={conteudo}
            required={true}
          />
          <Container>

            <Button variant="info" onClick={handleShowModal} style={btnSquare}>
              Adicionar Imagem Principal*
            </Button>

            <Button variant="info" onClick={handleShowModal2} style={btnSquare}>
              Adicionar Imagem Secundária*
            </Button>
          </Container>
        </Form.Group>

      </Form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Button
          variant="info"
          onClick={() => {
            enviarDados();
            console.log("TESTE1");          
            
          }}
          style={btnCadastrar}
        >
          CONCLUIR
        </Button>


        <Modal
            className="p-5 d-flex justify-content-center align-items-center"
            show={showModal4}
            onHide={handleCloseModal4}
          >
            <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
              Notícia cadastrada com sucesso!
            </Modal.Title>

            <Modal.Body className="p-3 d-flex justify-content-center align-items-center">
              <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="120"
                    height="120"
                    style={{
                      display: "flex",
                      position: "relative",
                      bottom: "2vh",
                    }}
                    fill="currentColor"
                    class="bi bi-check2-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                  </svg>
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-center align-items-center">
              <Button
                className="d-flex justify-content-center align-items-center"
                variant="primary"                
               
                
                onClick={() => {
                  navigate("/home");
                  handleCloseModal4();
                }}

                style={{
                  position: "relative",
                  fontWeight: "bold",
                  width: "8rem",
                  borderRadius: "10.35px",
                  color: "#ffffff",
                  backgroundColor: "#51B5C5",
                  border: "#51B5C5",
                }}
              >
                OK
              </Button>
            </Modal.Footer>
          </Modal>

      </div>
      <Modal show={showModal2} onHide={handleCloseModal2}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Link de Imagem Secundária</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Link"
                autoFocus
                value={imagemSecundaria}
                onChange={(e) => setImagemSecundaria(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseModal2}
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
            ADICIONAR
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Link de Imagem Principal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Link"
                autoFocus
                value={imagemPrincipal}
                onChange={(e) => setImagemPrincipal(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleCloseModal}
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
            ADICIONAR
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="p-5 d-flex justify-content-center align-items-center"
        show={showModal3}
        onHide={handleCloseModal3}
      >
        <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
          Cadastro realizado com sucesso!
        </Modal.Title>

        <Modal.Body className="p-3 d-flex justify-content-center align-items-center">
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                fill="currentColor"
                style={{
                  display: "flex",
                  position: "relative",
                  bottom: "2vh",
                }}
                class="bi bi-check2-circle"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
              </svg>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center align-items-center">
          <Button
            className="d-flex justify-content-center align-items-center"
            variant="primary"
            onClick={handleCloseModal3}
            style={{
              position: "relative",
              fontWeight: "bold",
              width: "8rem",
              borderRadius: "10.35px",
              color: "#ffffff",
              backgroundColor: "#51B5C5",
              border: "#51B5C5",
            }}
          >
            OK!
          </Button>
        </Modal.Footer>
      </Modal>
 
    </>
  );
};
