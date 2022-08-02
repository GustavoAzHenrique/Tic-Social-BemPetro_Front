import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { ThemeContext } from "../../context/ThemeMode/style";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/api";
import { ReRenderContext } from "../../context/ReRender/Rerender";

export const CardHomeEvento = ({ pulicacao, id }) => {
  const { statusCard, btnCard, theme } = useContext(ThemeContext);
  const [section, setSection] = useState(0);
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);
  const { token } = useContext(AuthContext);
  const { ChangeRender, renderCount } = useContext(ReRenderContext);
  const navigate = useNavigate();
  useEffect(() => {
    CondicionalPlay();
  }, []);

  function CondicionalPlay() {
    if (pulicacao.status.status === "pausado") {
      setSection(0);
    } else {
      setSection(1);
    }
  }

  function handleSubmitPlayStop() {
    api
      .put(
        `/evento/${pulicacao.id}/pausar`,
        {},
        { headers: { Authorization: token } }
      )
      .then((res) => {
        console.log(res);
        ChangeRender();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  function handleSubmitDelete() {
    api
      .delete(`/evento/${pulicacao.id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res);
        setShowModal3(false);
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
    .btn-border{
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
    .btn-card-bt{
      width: "4rem",
      height: "4rem",
      borderRadius: "100%",
      backgroundColor: "#EFEFEF",
      borderColor:"#51B5C5",
      marginBottom: "1rem"
    }

    
    `}
      </style>

      <Card style={{ height: "350px" }}>
        <Card.Body>
          <Card.Title style={{ width: "15rem" }}>{pulicacao.nome}</Card.Title>

          <Card.Img
            style={{ width: "15rem", height: "140px" }}
            src={pulicacao.imagem}
          />

          <Card.Subtitle
            className="card-subtitle-um mb-3 mt-3"
            style={statusCard}
          >
            {pulicacao.status.status}
          </Card.Subtitle>

          <div className="botoes">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "33%",
              }}
            >
              <Button
                style={btnCard}
                onClick={() => navigate(`/editarpublievento/${id}`)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                  style={theme}
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                  />
                </svg>
              </Button>
              <Card.Subtitle className="card-subtitle-dois">
                EDITAR
              </Card.Subtitle>
            </div>

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
                <Button
                  disabled={
                    pulicacao.status.status === "pausado" ? false : true
                  }
                  style={btnCard}
                  onClick={() => handleSubmitPlayStop()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    class="bi bi-play"
                    viewBox="0 0 16 16"
                    style={theme}
                  >
                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  ATIVAR
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
                  width: "33%",
                }}
              >
                <Button
                  disabled={
                    pulicacao.status.status === "aprovado" ? false : true
                  }
                  style={btnCard}
                  onClick={() => handleSubmitPlayStop()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="currentColor"
                    class="bi bi-pause-fill"
                    viewBox="0 0 16 16"
                    style={theme}
                  >
                    <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z" />
                  </svg>
                </Button>
                <Card.Subtitle className="card-subtitle-dois">
                  PAUSAR
                </Card.Subtitle>
              </div>
            )}

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                width: "33%",
              }}
            >
              <Button
                // className="btn-dois"
                onClick={handleShowModal3}
                style={btnCard}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  fill="currentColor"
                  class="bi bi-trash"
                  viewBox="0 0 16 16"
                  style={theme}
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                  <path
                    fill-rule="evenodd"
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                  />
                </svg>
              </Button>
              <Card.Subtitle className="card-subtitle-dois">
                EXCLUIR
              </Card.Subtitle>
              <Modal
                className="p-5 d-flex justify-content-center align-items-center"
                show={showModal3}
                onHide={handleCloseModal3}
              >
                <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
                  Você tem certeza que deseja excluir?
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
                          left: "1vw",
                        }}
                        fill="currentColor"
                        class="bi bi-box-arrow-right"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                        />
                        <path
                          fill-rule="evenodd"
                          d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                        />
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
                    onClick={() => handleSubmitDelete()}
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
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};
