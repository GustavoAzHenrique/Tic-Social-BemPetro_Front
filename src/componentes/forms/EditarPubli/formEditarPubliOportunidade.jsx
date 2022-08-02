import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";

export const FormEditarPubliOportunidade = () => {
  const [Titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [inicio, setInicio] = useState("");
  const [fim, setFim] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [requisito, setRequisito] = useState("");
  const [salario, setSalario] = useState("");
  const [quantidadeDeVaga, setQuantidadeDeVaga] = useState("");
  const [nomeParaContato, setNomeParaContato] = useState("");
  const [telefone, setTelefone] = useState("");
  const [emailDeContato, setEmailDeContato] = useState("");
  const [uf, setUf] = useState("");
  const [tipoDeJornada, setTipoDeJornada] = useState("");
  const [jornada, setJornada] = useState("");
  const [contratacao, setContratacao] = useState("");
  const [modalidade, setModalidade] = useState("");
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [showModal2, setShowModal2] = useState(false);
  const handleCloseModal2 = () => setShowModal2(false);
  const handleShowModal2 = () => setShowModal2(true);




  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", width: "80%" }}>
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
                placeholder="Empresa*"
                onChange={(e) => setEmpresa(e.target.value)}
                value={empresa}
              />

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Descrição"
                onChange={(e) => setDescricao(e.target.value)}
                value={descricao}
              />

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Cargo*"
                onChange={(e) => setCargo(e.target.value)}
                value={cargo}
              />

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Requisito*"
                onChange={(e) => setRequisito(e.target.value)}
                value={requisito}
              />

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-50"
                  type="text"
                  placeholder="Início*"
                  autoFocus
                  onChange={(e) => setInicio(e.target.value)}
                  value={inicio}
                />
                <Form.Control
                  className="mb-0 w-50 "
                  type="text"
                  autoFocus
                  placeholder="Fim*"
                  onChange={(e) => setFim(e.target.value)}
                  value={fim}
                />
              </Form.Group>

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="Benefício"
                onChange={(e) => setBeneficio(e.target.value)}
                value={beneficio}
              />

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-50"
                  type="text"
                  placeholder="Salário"
                  autoFocus
                  onChange={(e) => setSalario(e.target.value)}
                  value={salario}
                />
                <Form.Control
                  className="mb-0 w-50 "
                  type="text"
                  autoFocus
                  placeholder="Quantidade de Vaga*"
                  onChange={(e) => setQuantidadeDeVaga(e.target.value)}
                  value={quantidadeDeVaga}
                />
              </Form.Group>

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-50"
                  type="text"
                  placeholder="Nome para Contato*"
                  autoFocus
                  onChange={(e) => setNomeParaContato(e.target.value)}
                  value={nomeParaContato}
                />
                <Form.Control
                  className="mb-0 w-50 "
                  type="text"
                  autoFocus
                  placeholder="Telefone*"
                  onChange={(e) => setTelefone(e.target.value)}
                  value={telefone}
                />
              </Form.Group>

              <Form.Control
                className="mb-3"
                type="text"
                placeholder="E-mail de Contato*"
                onChange={(e) => setEmailDeContato(e.target.value)}
                value={emailDeContato}
              />

              <Form.Group className="row mb-3 mx-auto">
                <Form.Control
                  className="mb-0 w-50"
                  type="text"
                  placeholder="UF*"
                  autoFocus
                  onChange={(e) => setUf(e.target.value)}
                  value={uf}
                />

                <Dropdown
                  style={{
                    width: "50%",
                    height: "40px",
                    position: "relative",
                    top: "0.325vh",
                  }}
                >
                  <Dropdown.Toggle
                    style={{
                      width: "90%",
                      height: "70px",
                      position: "relative",
                      height: "35px",
                      fontSize: "1.0vw",
                      fontWeight: "bold",
                    }}
                    variant="light"
                    bg="light"
                    expand="lg"
                  >
                    Contratação*
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
                    <Dropdown.Item href="#/action-2">Teste1</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <a
                  style={{ color: "#51B5C5", padding: "0px" }}
                  onClick={handleShowModal2}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="4vh"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                    style={{
                      position: "relative",
                      bottom: "5.3vh",
                      left: "37.8vw",
                      color: "#51B5C5",
                    }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </a>
                <Modal show={showModal2} onHide={handleCloseModal2}>
                  <Modal.Header closeButton>
                    <Modal.Title>Adicionar Contratação</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="email"
                          placeholder="Contratação"
                          autoFocus
                          value={contratacao}
                          onChange={(e) => setContratacao(e.target.value)}
                        />
                      </Form.Group>
                    </Form>
                  </Modal.Body>

                  <Modal.Footer>
                    <Button
                      variant="primary"
                      onClick={() => {
                        enviarDadosModal2();
                        handleCloseModal2();
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
              
                <Dropdown
                  style={{
                    width: "50.5%",
                    height: "40px",
                    position: "relative",
                    bottom: "3.9vh",
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
                    Jornada*
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
                <a
                  style={{ color: "#51B5C5", padding: "0px" }}
                  onClick={handleShowModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="4vh"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                    style={{
                      position: "relative",
                      bottom: "9.2vh",
                      left: "17.8vw",
                      color: "#51B5C5",
                    }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </a>
                <Modal show={showModal} onHide={handleCloseModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Adicionar Jornada</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form>
                      <Form.Group controlId="exampleForm.ControlInput1">
                        <Form.Control
                          type="email"
                          placeholder="Jornada"
                          autoFocus
                          value={jornada}
                          onChange={(e) => setJornada(e.target.value)}
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
              bottom: "9vh",
              fontWeight: "bold",
            }}
          >
            Concluir
          </Button>
        </div>
      </div>
    </>
  );
};
