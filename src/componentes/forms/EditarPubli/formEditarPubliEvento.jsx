import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

export const FormEditarPubliEvento = () => {
  const [Titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [valorIngresso, setValorIngresso] = useState("");
  const [data, setData] = useState("");
  const [horaInicio, sethoraInicio] = useState("");
  const [horaFim, sethoraFim] = useState("");
  const [local, setLocal] = useState("");
  const [organizador, setOrganizador] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  
  


  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "80%", }}>
        <Form className=" mt-4 d-flex align-items-center justify-content-center">
          <Form.Group
            className="w-100"
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: "3px",
            }}
          >
            <Form.Group className="mb-5 w-100">
              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Título*"
                autoFocus
                onChange={(e) => setTitulo(e.target.value)}
                value={Titulo}
              />

              <Form.Control
                className="mb-3"
                type="text"
                autoFocus
                placeholder="Subtítulo*"
                onChange={(e) => setSubtitulo(e.target.value)}
                value={subtitulo}
              />

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Organizador*"
                onChange={(e) => setOrganizador(e.target.value)}
                value={organizador}
              />

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Descrição*"
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
              />

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-50"
                  type="text"
                  placeholder="Horário Início*"
                  autoFocus
                  onChange={(e) => sethoraInicio(e.target.value)}
                  value={horaInicio}
                />
                <Form.Control
                  className="mb-0 w-50 "
                  type="text"
                  autoFocus
                  placeholder="Horário Fim*"
                  onChange={(e) => sethoraFim(e.target.value)}
                  value={horaFim}
                />
              </Form.Group>

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Local*"
                onChange={(e) => setLocal(e.target.value)}
                value={local}
              />
              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-50"
                  type="text"
                  placeholder="Valor Ingresso"
                  autoFocus
                  onChange={(e) => setValorIngresso(e.target.value)}
                  value={valorIngresso}
                />
                <Form.Control
                  className="mb-0 w-50 "
                  type="text"
                  autoFocus
                  placeholder="Data*"
                  onChange={(e) => setData(e.target.value)}
                  value={data}
                />
              </Form.Group>

              <Form.Group className="mb-3 mx-auto row">
                <Button
                  variant="info"
                  onClick={handleShowModal}
                  
                  style={{
                    position: "relative",
                    height: "35px",
                    fontSize: "1.0vw",
                    color: "#ffffff",
                    width: "50%",

                    fontWeight: "bold",
                  }}
                >
                  Adicionar Imagem*
                </Button>

                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Adicionar Link de Imagem Principal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                        
                          controlId="exampleForm.ControlInput1"
                        >
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
                        onClick={handleShowModal}
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
                        Adicionar
                      </Button>
                    </Modal.Footer>
                  </Modal>
               
                  <Dropdown
                    style={{
                      width: "50%",
                      height: "40px",
                      position: "relative",
                    }}
                  >
                    <Dropdown.Toggle
                      style={{
                        width: "85%",
                        position: "relative",
                        height: "35px",
                        fontSize: "1.0vw",
                        fontWeight: "bold",
                      }}
                      variant="light"
                      bg="light"
                      expand="lg"
                    >
                      Tipo de Evento*
                    </Dropdown.Toggle>

                    <Dropdown.Menu
                      variant="white"
                      bg="white"
                      expand="lg"
                      style={{
                        position: "absolute",
                        width: "40%",
                      }}
                    >
                      <Dropdown.Item href="#/action-2">Teste</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <a style={{ color: "#51B5C5", padding: "0px", }} onClick={handleShowModal}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="4vh"
                      fill="currentColor"
                      class="bi bi-plus-circle"
                      viewBox="0 0 16 16"
                      style={{
                        position: "relative",
                        bottom: "5.3vh",
                        left:"37.3vw",
                        color: "#51B5C5",
                      }}
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                  </a>
                  <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                      <Modal.Title>Adicionar Link de Imagem</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Group
                        
                          controlId="exampleForm.ControlInput1"
                        >
                          <Form.Control
                            
                            type="email"
                            placeholder="Adicionar Link de Imagem"
                            autoFocus
                            value={tipoEvento}
                            onChange={(e) => setTipoEvento(e.target.value)}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={() => {
                          enviarDadosModal();
                          handleCloseModal();
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
                        Adicionar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                
              </Form.Group>
            </Form.Group>
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
            style={{
              position: "relative",
              
              height: "50px",
              borderRadius: "50.35px",
              fontSize: "1.8vw",
              color: "#ffffff",
              width: "40%",
              bottom: "5vh",
              fontWeight: "bold",
            }}
          >
            ATUALIZAR
          </Button>
        </div>
      </div>
    </>
  );
};
