import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../context/AuthContext/index.jsx";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Container, BtnAddImag } from "./style.jsx";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import InputGroup from "react-bootstrap/InputGroup";
import { ReRenderContext } from "../../../context/ReRender/Rerender.jsx";
import { useNavigate } from "react-router-dom";


export const FormCadastrarPubliEvento = () => {
  const [nomeEvento, setNomeEvento] = useState("");
  const [descricao, setDescricao] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [valorIngresso, setValorIngresso] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [horaInicio, setHoraInicio] = useState("");
  const [horaTermino, setHoraTermino] = useState("");
  const [local, setLocal] = useState("");
  const [organizador, setOrganizador] = useState("");
  const [tipoEvento, setTipoEvento] = useState("");
  const [nomeEsporte, setNomeEsporte] = useState("");
  const [categoriaEventoEsportivo, setCategoriaEventoEsportivo] = useState("");
  const [imagemPrincipal, setImagemPrincipal] = useState("");
  const [section, setSection] = useState(0);
  const { btnCadastrar, modalIcon, btnSquare } = useContext(ThemeContext);
  const [tipoEventoList, setTipoEventoList] = useState([]);
  const [tipoEventoData, setTipoEventoData] = useState();
  const [catEventoEsList, setCatEventoEsList] = useState([]);
  const { ChangeRender, renderCount } = useContext(ReRenderContext);
  const navigate = useNavigate();

  let dados = {
    nome: nomeEvento,
    subTitulo: subtitulo,
    dataEvento: dataEvento,
    descricao: descricao,
    imagem: imagemPrincipal,
    tipoEvento: tipoEventoData,
    organizador: organizador,
    horaInicio: dataEvento + "T" + horaInicio,
    horaTermino: dataEvento + "T" + horaTermino,
    local: local,
    valorIngresso: valorIngresso,
    categoriaEventoEsportivo: categoriaEventoEsportivo,
  };

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [showModal1, setShowModal1] = useState(false);
  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const [showModal4, setShowModal4] = useState(false);
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);

  const handleCloseModal5 = () => setShowModal5(false);
  const handleShowModal5 = () => setShowModal5(true);
  const [showModal5, setShowModal5] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const { token } = useContext(AuthContext);

  function enviarDados() {
    if (!validate()) return;
    handleShowModal5();
    api.post(`/evento`, dados, { headers: { Authorization: token } }).then().catch(error => {
      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    });
  }

  

  // const onInputChangevalorIngresso = (e) => {
  //   const { value } = e.target;
  //   console.log("Input value: ", value);

  //   const re = /^(\d{1,3}(.\d{3})*|\d+)(,\d{2})?$/;
  //   if (value === "" || re.test(value)) {
  //     setValorIngresso(value);
  //   }
  // };

  function validate() {
    if (!dados.nome)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Nome Evento!",
      });
    if (!dados.subTitulo)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo SubTitulo!",
      });
    if (!dados.organizador)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Organizador!",
      });
    if (!dados.descricao)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Descrição!",
      });
    if (!dados.horaInicio)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Hora Início!",
      });
    if (!dados.horaTermino)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Hora Termino!",
      });
    if (!dados.local)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Local!",
      });
    if (!dados.valorIngresso)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Valor Ingresso!",
      });
    if (!dados.dataEvento)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Data Evento!",
      });

    return true;
  }

  function enviarDadosTipoEvento() {
    api.post(
      "/tipoEvento",
      { tipo: tipoEvento },
      { headers: { Authorization: token } }
    ).then((res) => {
      ChangeRender();
    })
    .catch((error) => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    });
  }

  function enviarDadosCategoriaEsp() {
    api.post(
      "/catEventoEsport",
      { nome: nomeEsporte },
      { headers: { Authorization: token } }
    ).then((res) => {
      ChangeRender();
    })
    .catch((error) => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    });
    
  }

  function handleTipoEventoClick(item) {
    if (item.tipo === "esportivo") {
      setSection(1);
    } else {
      setSection(0);
    }

    setTipoEventoData(item.tipo);
  }

  function getTipoEventoList() {
    api
      .get("/tipoEvento", { headers: { Authorization: token } })
      .then((res) => {
        setTipoEventoList(res.data);
      })
      .catch((error) => {
        console.log(error);

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  function getCatEventoEsportivo() {
    api
      .get("/catEventoEsport", { headers: { Authorization: token } })
      .then((res) => {
        setCatEventoEsList(res.data);
      })
      .catch((error) => {
        console.log(error);

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  useEffect(() => {
    if (token) {
      getTipoEventoList();
      getCatEventoEsportivo();
    }
  }, [token,renderCount]);

  return (
    <>
      {console.log(dados)}
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
        <Form.Group className="w-50">
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Nome Evento*"
            autoFocus={true}
            maxLength="25"
            onChange={(e) => setNomeEvento(e.target.value)}
            value={nomeEvento}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"
            
            maxLength="50"
            placeholder="Subtítulo*"
            onChange={(e) => setSubtitulo(e.target.value)}
            value={subtitulo}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"
            maxLength="30"
            placeholder="Organizador*"
            onChange={(e) => setOrganizador(e.target.value)}
            value={organizador}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"
            maxLength={300}
            placeholder="Descrição*"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            required={true}
          />

          <Form.Group className="mb-3 mx-auto row">
            <InputGroup.Text className="w-50" id="basic-addon1">
              Horário Início*
            </InputGroup.Text>
            <InputGroup.Text className="w-50" id="basic-addon1">
              Horário Fim*
            </InputGroup.Text>
            <Form.Control
              className="mb-0 w-50"
              type="time"
              placeholder="Horário Início*"
              mask="00:00"
              
              onChange={(e) => setHoraInicio(e.target.value)}
              value={horaInicio}
              required={true}
            />
            <Form.Control
              className="mb-0 w-50 "
              type="time"
              
              mask="00:00"
              placeholder="Horário Fim*"
              onChange={(e) => setHoraTermino(e.target.value)}
              value={horaTermino}
              required={true}
            />
          </Form.Group>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Local*"
            maxLength="80"
            onChange={(e) => setLocal(e.target.value)}
            value={local}
            required={true}
          />
          <Form.Group className="mb-3 mx-auto row">
            <Form.Control
              className="mb-0 w-50"
              type="text"
              as={IMaskInput}
              mask="000000"
              placeholder="Valor Ingresso"              
              onChange={(e) => setValorIngresso(e.target.value)}
              value={valorIngresso}
            />
            <Form.Control
              className="mb-0 w-50 "
              type="date"
              
              placeholder="Data* (yyyy-mm-dd)"
              onChange={(e) => setDataEvento(e.target.value)}
              value={dataEvento}
              required={true}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3 mx-auto row"> */}
          <Container>
            {/* <BtnAddImag> */}
            <Button
              className="mb-0 w-100 "
              variant="info"
              onClick={handleShowModal1}
              style={btnSquare}
            >
              Adicionar Imagem*
            </Button>
            {/* </BtnAddImag> */}
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "85%",
                }}
              >
                <Dropdown
                  style={{
                    width: "100%",
                  }}
                >
                  <Dropdown.Toggle
                    style={{
                      width: "100%",
                      height: "38px",
                      fontWeight: "bold",
                    }}
                    variant="light"
                    bg="light"
                    expand="lg"
                  >
                    {tipoEventoData ? tipoEventoData : "Tipo de Evento*"}
                  </Dropdown.Toggle>
                  {console.log(dados)}
                  <Dropdown.Menu
                    variant="white"
                    bg="white"
                    expand="lg"
                    style={{
                      position: "absolute",
                      width: "40%",
                    }}
                  >
                    {tipoEventoList.map((item) => (
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={() => {
                          handleTipoEventoClick(item);
                        }}
                      >
                        {item.tipo}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div
                style={{
                  display: "flex",
                  flewDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "15%",
                }}
              >
                {/* <Form.Group className="mb-3 mx-auto row"> */}

                <a style={modalIcon} onClick={handleShowModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="4vh"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                    style={modalIcon}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </a>
              </div>
            </div>
          </Container>
          {/* </Form.Group> */}
          {/* </Form.Group> */}
          {section === 1 && (
            <Form.Group className="mb-3 mt-3 mx-auto row">
              {/* <div
                style={{
                  display: "flex",
                  width: "100%",
                }}
              > */}
              <Dropdown
                style={{
                  padding: "0",
                  width: "92.5%",
                  height: "38px",
                }}
              >
                <Dropdown.Toggle
                  style={{
                    width: "100%",
                    height: "38px",
                    fontWeight: "bold",
                  }}
                  variant="light"
                  bg="light"
                  expand="lg"
                >
                  {categoriaEventoEsportivo
                    ? categoriaEventoEsportivo
                    : "Esporte*"}
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
                  {catEventoEsList.map((item) => (
                    <Dropdown.Item
                      onClick={() => setCategoriaEventoEsportivo(item.nome)}
                      href="#/action-2"
                    >
                      {item.nome}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div
                style={{
                  display: "flex",
                  flewDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "7.5%",
                  padding: "0",
                }}
              >
                <a style={modalIcon} onClick={handleShowModal4}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="4vh"
                    fill="currentColor"
                    class="bi bi-plus-circle"
                    viewBox="0 0 16 16"
                    style={modalIcon}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                  </svg>
                </a>
              </div>
              {/* </div> */}
            </Form.Group>
          )}
        </Form.Group>
      </Form>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        <Button
          variant="info"
          onClick={() => {
            enviarDados();
            
          }}
          style={btnCadastrar}
        >
          CONCLUIR
        </Button>

        <Modal
            className="p-5 d-flex justify-content-center align-items-center"
            show={showModal5}
            onHide={handleCloseModal5}
          >
            <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
              Evento cadastrado com sucesso!
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
                  handleCloseModal5();
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
      <Modal show={showModal4} onHide={handleCloseModal4}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo tipo de esporte</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Tipo de Esporte"
                autoFocus
                value={nomeEsporte}
                onChange={(e) => setNomeEsporte(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              enviarDadosCategoriaEsp();
              handleCloseModal4();
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
      <Modal show={showModal1} onHide={handleCloseModal1}>
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
            onClick={handleCloseModal1}
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
          <Modal.Title>Cadastrar novo tipo de evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="Tipo de Evento"
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
              enviarDadosTipoEvento();
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
            CADASTRAR
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
