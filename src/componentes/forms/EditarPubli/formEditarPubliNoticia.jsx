import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export const FormEditarPubliNoticia = () => {
  const [Titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [imagemSecundaria, setImagemSecundaria] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);
 
 

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
        <Form className=" mt-3 d-flex align-items-center justify-content-center"
        >
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
                placeholder="Conteúdo*"
                onChange={(e) => setConteudo(e.target.value)}
                value={conteudo}
              />
              <div style={{display: "flex", flewDirection: "row",}}>
                
              <Button
                  variant="info"
                  onClick={handleShowModal}
                  style={{
                    position: "relative",
                    height: "50px",
                    fontSize: "1.0vw",
                    color: "#ffffff",
                    width: "49%",

                    fontWeight: "bold",
                  }}
                >
                  Adicionar Imagem Principal*
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
                
                <Button
                  variant="info"
                  onClick={handleShowModal2}
                  style={{
                    position: "relative",
                    height: "50px",
                    fontSize: "1.0vw",
                    color: "#ffffff",
                    width: "49%",
                    left: "2%",
                    fontWeight: "bold",
                  }}
                >
                  Adicionar Imagem Secundária*
                </Button>
                <Modal show={showModal2} onHide={handleCloseModal2}>
                    <Modal.Header closeButton>
                      <Modal.Title>Adicionar Link de Imagem Secundária</Modal.Title>
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
                            value={imagemSecundaria}
                            onChange={(e) => setImagemSecundaria(e.target.value)}
                          />
                        </Form.Group>
                      </Form>
                    </Modal.Body>

                    <Modal.Footer>
                      <Button
                        variant="primary"
                        onClick={handleShowModal2}
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
                </div>
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
              bottom: "2vh",
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