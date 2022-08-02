import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { IMaskInput } from "react-imask";
import { Container, BtnAddImag } from "./style.jsx";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../context/AuthContext/index.jsx";
import { ReRenderContext } from "../../../context/ReRender/Rerender.jsx";
import { useNavigate } from "react-router-dom";

export const FormEditarEvento = () => {
  const [evento, setEventoList] = useState([]);
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
  const { token } = useContext(AuthContext);
  const [tipoEventoList, setTipoEventoList] = useState([]);
  const [catEventoEsList, setCatEventoEsList] = useState([]);
  const { id } = useParams();
  const { ChangeRender, renderCount } = useContext(ReRenderContext);
  const navigate = useNavigate();

  let dados = {
    nome: nomeEvento,
    subTitulo: subtitulo,
    dataEvento: dataEvento,
    descricao: descricao,
    imagem: imagemPrincipal,
    tipoEvento: tipoEvento,
    organizador: organizador,
    horaInicio: dataEvento + "T" + horaInicio,
    horaTermino: dataEvento + "T" + horaTermino,
    local: local,
    valorIngresso: valorIngresso,
    categoriaEventoEsportivo: categoriaEventoEsportivo,
  };

  useEffect(() => {
    if (token && id) {
      getEditEvento();
      getUserData();
      getTipoEventoList();
      getCatEventoEsportivo();
    }
  }, [token, id]);

  useEffect(() => {
    getTipoEventoList();
    getCatEventoEsportivo();
  }, [renderCount]);

  function getEditEvento() {
    api
      .get(`/evento/${id}`, { headers: { Authorization: token } })
      .then((res) => {
        setEventoList(res.data);
      })
      .catch((error) => {
        console.log(error);

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  function getUserData() {
    api
      .get(`/evento/${id}`, { headers: { Authorization: token } })
      .then((res) => {
        setNomeEvento(res.data.nome);
        setSubtitulo(res.data.subTitulo);
        setDataEvento(res.data.dataEvento);
        setDescricao(res.data.descricao);
        setImagemPrincipal(res.data.imagem);
        setTipoEvento(res.data.tipoEvento.tipo);
        setOrganizador(res.data.organizador);
        setHoraInicio(res.data.horaInicio.split("T")[1]);
        setHoraTermino(res.data.horaTermino.split("T")[1]);
        setLocal(res.data.local);
        setValorIngresso(res.data.valorIngresso);
        setCategoriaEventoEsportivo(res.data.categoriaEventoEsportivo.nome);
      })
      .catch((error) => {
        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  function handleUpdateSubmit() {
    api
      .put(`/evento/${id}`, dados, { headers: { Authorization: token } })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });

    handleShowModal3();
  }

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);

  const [showModal1, setShowModal1] = useState(false);
  const handleCloseModal1 = () => setShowModal1(false);
  const handleShowModal1 = () => setShowModal1(true);

  const [showModal4, setShowModal4] = useState(false);
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

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
    if (!dados.dataEvento)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Data Evento!",
      });
    if (!dados.descricao)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Descrição!",
      });
    if (!dados.imagem)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Imagem!",
      });
    if (!dados.tipoEvento)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Tipo Evento!",
      });
    if (!dados.organizador)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Organizador!",
      });
    if (!dados.horaInicio)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Hora Inicio!",
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

    return true;
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

  function enviarDadosTipoEvento() {
    api
      .post(
        "/tipoEvento",
        { tipo: tipoEvento },
        { headers: { Authorization: token } }
      )
      .then((res) => {
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
    api
      .post(
        "/catEventoEsport",
        { nome: nomeEsporte },
        { headers: { Authorization: token } }
      )
      .then((res) => {
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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        {console.log(evento)}
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
            autoFocus
            maxLength="50"
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
          />

          <Form.Control
            className="mb-3"
            type="text"
            maxLength="30"
            placeholder="Organizador*"
            onChange={(e) => setOrganizador(e.target.value)}
            value={organizador}
          />

          <Form.Control
            className="mb-3"
            type="text"
            maxLength="150"
            placeholder="Descrição*"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
          />

          <Form.Group className="mb-3 mx-auto row">
            <Form.Control
              className="mb-0 w-50"
              type="time"
              placeholder="Horário Início*"
              mask="00:00"
              onChange={(e) => setHoraInicio(e.target.value)}
              value={horaInicio}
            />
            <Form.Control
              className="mb-0 w-50 "
              type="time"

              mask="00:00"
              placeholder="Horário Fim*"
              onChange={(e) => setHoraTermino(e.target.value)}
              value={horaTermino}
            />
          </Form.Group>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Local*"
            maxLength="80"
            onChange={(e) => setLocal(e.target.value)}
            value={local}
          />
          <Form.Group className="mb-3 mx-auto row">
            <Form.Control
              className="mb-0 w-50"
              type="text"
 
              placeholder="Valor Ingresso"

              onChange={(e) => setValorIngresso(e.target.value)}
              value={valorIngresso}
            />
            <Form.Control
              className="mb-0 w-50 "
              type="date"

              placeholder="Data*"
              onChange={(e) => setDataEvento(e.target.value)}
              value={dataEvento}
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
                    {tipoEvento ? tipoEvento : "Tipo de Evento*"}
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
                    {tipoEventoList?.map((item) => (
                      <Dropdown.Item
                        href="#/action-2"
                        onClick={() => {
                          setTipoEvento(item.tipo);
                          if (item.tipo === "esportivo") {
                            setSection(1);
                          }
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
                  {catEventoEsList?.map((item) => (
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
          marginTop: "3rem",
        }}
      >
        <Button
          variant="info"
          onClick={() => {
            handleUpdateSubmit();
          }}
          style={btnCadastrar}
        >
          CONCLUIR
        </Button>
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
      <Modal
        className="p-5 d-flex justify-content-center align-items-center"
        show={showModal3}
        onHide={handleCloseModal3}
      >
        <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
          Evento atualizado com sucesso!
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
            onClick={() => {
              navigate("/home");
              handleCloseModal3();
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
            OK!
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
