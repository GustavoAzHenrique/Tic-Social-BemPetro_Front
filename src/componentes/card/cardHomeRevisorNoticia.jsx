import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { ThemeContext } from "../../context/ThemeMode/style";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/api";
import { ReRenderContext } from "../../context/ReRender/Rerender";

export const CardHomeRevisorNoticia = ({ noticia }) => {
  const [showModal, setShowModal] = useState(false);
  const [teste, setTeste] = useState("");
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);
  const handleCloseModal6 = () => setShowModal6(false);
  const handleShowModal6 = () => setShowModal6(true);
  const [showModal6, setShowModal6] = useState(false);
  const { token, id } = useContext(AuthContext);
  const { statusCard, btnCard, modalIcon, theme } = useContext(ThemeContext);
  const [section, setSection] = useState();
  const { ChangeRender, renderCount } = useContext(ReRenderContext);

  useEffect(() => {
    // console.log(evento.nome);
    CondicionalPlay();
  }, []);

  function CondicionalPlay() {
    if (noticia.status.status === "pendente") {
      setSection(0);
    } else {
      setSection(1);
    }
  }
  function handleSubmitAprovar() {
    api
      .put(
        `/noticia/${noticia.id}/aprovar`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res);
        setShowModal3(false);
        ChangeRender();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleSubmitReprovar() {
    api
      .put(
        `/noticia/${noticia.id}/reprovar`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res);
        setShowModal6(false);
        ChangeRender();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div>
      <style type="text/css">
        {`
    .card{
      display: flex;
      align-items: center;
      justify-content: center;
      position: "relative"
      height: 20%
      border-radius: 50%;
      
     
    }
    .card-title {
      display: flex;
      position: "relative"
      align-items: center;
      justify-content: center;
      font-weight: bold;
      color: #000000;
      
    }
    .card-subtitle-um {
      font-weight: bold;
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      color: #000000;
      font-size: 120%;
      border: 50px;
    }
    .card-subtitle-dois {
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000000;
    }
    .btn-dois {
      background-color: #EFEFEF;
      border-color: #51B5C5;
      
    }
    .card-body  {
      justify-content: center;
      border-radius: 50%;
      position: relative;
      align-items: center;
      
    }
    .card-img  {
      height: 20vh
      display: flex;
      position: "relative"
      align-items: center;
      justify-content: center;
  
    
    }
    .botoes {
      display: flex;
      flexDirection: row;
  
    
    }
    .botoesdef {
      display: flex;
      alignItems: center;
      justifyContent: center;
      flexDirection: column;
    width: 30%;
    }
    .aprovado {
      width: 30%;
      height: 30%;;
      border-width: 30px; 
border-style: solid; 
border-color:  blue;
    }


    
    `}
      </style>

      <Card>
        <Card.Body style={{ height: "350px" }}>
          <Card.Title style={{ width: "15rem"  }}>{noticia.nome}</Card.Title>

          <Card.Img style={{ width: "15rem" , height: "140px"}} src={noticia.imagemPrimaria} />
          <Card.Subtitle
            className="card-subtitle-um mb-3 mt-3"
            style={statusCard}
          >
            {noticia.status.status}
          </Card.Subtitle>
          <div className="botoes">
            {section === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "33%",
                }}
              >
                <Button style={btnCard} onClick={handleShowModal3}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-check2-circle"
                    viewBox="0 0 16 16"
                    style={theme}
                  >
                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  APROVAR
                </Card.Subtitle>
              </div>
            )}
            {section === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "33%",
                }}
              >
                <Button style={btnCard} onClick={handleShowModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-file-earmark-text"
                    viewBox="0 0 16 16"
                    style={theme}
                  >
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  INFO
                </Card.Subtitle>
              </div>
            )}
            {section === 1 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <Button style={btnCard} onClick={handleShowModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-file-earmark-text"
                    viewBox="0 0 16 16"
                    style={theme}
                  >
                    <path d="M5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM5 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5z" />
                    <path d="M9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4.5L9.5 0zm0 1v2A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  INFO
                </Card.Subtitle>
              </div>
            )}

            {section === 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  width: "33%",
                }}
              >
                <Button style={btnCard} onClick={handleShowModal6}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-x-circle"
                    viewBox="0 0 16 16"
                    style={theme}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  REPROVAR
                </Card.Subtitle>
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      <Modal
        className="d-flex justify-content-center align-items-center"
        show={showModal}
        onHide={handleCloseModal}
      >
        {/* <div style={theme}> */}
        <div style={{ width: "100%", alignItems: "flex-end" }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleCloseModal}
            width="35"
            height="35"
            style={modalIcon}
            fill="currentColor"
            class="bi bi-x"
            viewBox="0 0 16 16"
          >
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </div>
        <div
          className=" d-flex justify-content-center align-items-center"
          style={{ display: "flex", flexDirection: "row" }}
        >
          <Modal.Title>{noticia.nome}</Modal.Title>
        </div>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Card.Text className="p-3 d-flex justify-content-center align-items-center">
                {noticia.subTitulo}
              </Card.Text>
              <Card.Img
                className="p-5"
                variant="top"
                src={noticia.imagemPrimaria}
              />
              <Card.Text className="p-3 d-flex justify-content-center align-items-center">
                {noticia.conteudo}
              </Card.Text>
              <Card.Text className="p-3 d-flex justify-content-center align-items-center">
                data noticia: {noticia.dataCadastro}
              </Card.Text>
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* </div> */}
      </Modal>
      <Modal
        className="p-5 d-flex justify-content-center align-items-center"
        show={showModal3}
        onHide={handleCloseModal3}
      >
        <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
          Certeza que deseja aprovar?
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
            style={{
              position: "relative",
              fontWeight: "bold",
              width: "8rem",
              borderRadius: "10.35px",
              color: "#51B5C5",
              backgroundColor: "#ffffff",
              borderColor: "#51B5C5",
            }}
            onClick={() => handleSubmitAprovar()}
          >
            SIM
          </Button>
          <Button
            className="d-flex justify-content-center align-items-center"
            variant="primary"
            onClick={
              //enviardados()
              handleCloseModal3
            }
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
            NÃO
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        className="p-5 d-flex justify-content-center align-items-center"
        show={showModal6}
        onHide={handleShowModal6}
      >
        <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
          Certeza que deseja reprovar?
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
            style={{
              position: "relative",
              fontWeight: "bold",
              width: "8rem",
              borderRadius: "10.35px",
              color: "#51B5C5",
              backgroundColor: "#ffffff",
              borderColor: "#51B5C5",
            }}
            onClick={() => handleSubmitReprovar()}
          >
            SIM
          </Button>
          <Button
            className="d-flex justify-content-center align-items-center"
            variant="primary"
            onClick={
              //enviardados()
              handleCloseModal6
            }
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
            NÃO
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
