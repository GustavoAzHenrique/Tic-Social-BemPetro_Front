import React, { useState, useContext, useEffect, } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../context/AuthContext/index.jsx";
import { IMaskInput } from "react-imask";
import InputGroup from "react-bootstrap/InputGroup";
import FormGroup from "react-bootstrap/esm/FormGroup.js";
import { Container, BtnAddImag } from "./style.jsx";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import { ReRenderContext } from "../../../context/ReRender/Rerender.jsx";
import { useForm } from "react-hook-form";

export const FormCadastrarPubliOportunidade = () => {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [cargo, setCargo] = useState("");
  const [dataValidadeInicio, setDataValidadeInicio] = useState("");
  const [dataValidadeFim, setDataValidadeFim] = useState("");
  const [beneficio, setBeneficio] = useState("");
  const [requisito, setRequisito] = useState("");
  const [salario, setSalario] = useState("");
  const [quantidadeVaga, setQuantidadeVaga] = useState("");
  const [contatoNome, setContatoNome] = useState("");
  const [ddd, setDDD] = useState();
  const [numero, setNumero] = useState();
  const [contatoEmail, setContatoEmail] = useState("");
  const [uf, setUf] = useState("");
  const [municipio, setMunicipio] = useState("");
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
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);
  const [showModal4, setShowModal4] = useState(false);
  const [cep, setCEP] = useState("");

  const { ChangeRender, renderCount } = useContext(ReRenderContext);
  const { btnCadastrar, modalIcon, btnSquare } = useContext(ThemeContext);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const [jornadaList, setJornadaList] = useState([]);
  const [modalidadeList, setModalidadeList] = useState([]);
  const [modalidadeCont, setModalidadeCont] = useState("");
  const [tipoJornada, setTipoJornada] = useState("");

  const navigate = useNavigate();
  const { register,  setValue } = useForm();

  const onInputChangeContatoNome = (e) => {
    const { value } = e.target;
    console.log("Input value: ", value);

    const re = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (value === "" || re.test(value)) {
      setContatoNome(value);
    }
  };
  const onInputChangeCargo = (e) => {
    const { value } = e.target;
    console.log("Input value: ", value);

    const re = /^[a-záàâãéèêíïóôõöúçñ ]+$/i;
    if (value === "" || re.test(value)) {
      setCargo(value);
    }
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValue("UF", data.uf);
        // setValue("Logradouro", data.logradouro);
        setValue("Municipio", data.localidade);
        setMunicipio(data.localidade);
        // setLogradouro(data.logradouro);
        setUf(data.uf);
      });
  };

  let dados = {
    titulo: titulo,
    descricao: descricao,
    empresa: empresa,
    cargo: cargo,
    dataValidadeInicio: dataValidadeInicio,
    dataValidadeFim: dataValidadeFim,
    beneficio: beneficio,
    requisito: requisito,
    salario: salario,
    quantidadeVaga: quantidadeVaga,
    contatoNome: contatoNome,
    contatoEmail: contatoEmail,
    contatoTelefones: [
      {
        ddd: ddd,
        numero: numero,
      },
    ],
    uf: uf,
    jornada: tipoJornada,
    modalidade: modalidadeCont,
    municipio: municipio,
  };

  const { token } = useContext(AuthContext);

  function enviarDados() {
    if (!validate()) return;
    handleShowModal4();
    api.post(`/oportunidade`, dados, { headers: { Authorization: token } });
    console.log(modalidade);
  }

  function validate() {
    if (!dados.titulo)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Título!",
      });
    if (!dados.descricao)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Descrição!",
      });
    if (!dados.empresa)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Empresa!",
      });
    if (!dados.cargo)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Cargo!",
      });

    if (!dados.dataValidadeInicio)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Data Início!",
      });
    if (!dados.dataValidadeFim)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Data Fim!",
      });
    if (!dados.beneficio)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Benefício!",
      });
    if (!dados.requisito)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Requisito!",
      });
    if (!dados.salario)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Salário!",
      });
    if (!dados.quantidadeVaga)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Quantidade de Vagas!",
      });
    if (!dados.contatoNome)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Nome para Contato!",
      });
    if (!dados.contatoEmail)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo E-mail de Contato!",
      });
    if (!dados.contatoTelefones)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Telefone!",
      });
    if (!dados.jornada)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Jornada!",
      });
    if (!dados.modalidade)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Modalidade!",
      });

    return true;
  }

  // const onInputChangeUf = (e) => {
  //   const { value } = e.target;
  //   console.log("Input value: ", value);

  //   const re = /[^A-Z\wÀ-ú]/g;
  //   if (value === "" || re.test(value)) {
  //     setUf(value);
  //   }
  // };

  function getJornadaList() {
    api.get('/tipoJornada', { headers: { Authorization: token } }).then(res => {
      setJornadaList(res.data);
    }).catch(error => {
      console.log(error);
    })
  }

  function getModalidadeList() {
    api.get('/modalidadeContratacao', { headers: { Authorization: token } }).then(res => {
      setModalidadeList(res.data);
    }).catch(error => {
      console.log(error);
    })
  }

  function postModalidade() {
    api.post('/modalidadeContratacao', { modalidade: contratacao }, { headers: { Authorization: token } }).then(res => {
      ChangeRender();
    }).catch(error => {
      console.log(error);
    })
  }

  function postJornada() {
    api.post('/tipoJornada', { tipo: jornada }, { headers: { Authorization: token } }).then(res => {
      ChangeRender();
    }).catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    if (token) {
      getJornadaList();
      getModalidadeList();
    }
  }, [token, renderCount]);

  return (
    <>
      {console.log(jornada)}
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
            placeholder="Título*"
            maxLength="25"
            autoFocus
            onChange={(e) => setTitulo(e.target.value)}
            value={titulo}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Empresa*"
            maxLength="50"
            onChange={(e) => setEmpresa(e.target.value)}
            value={empresa}
            required={true}
          />

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Descrição"
            maxLength="100"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            required={true}
          />

          <Form.Group className="mb-0 mx-auto row">
          <Form.Control
                  className="mb-3 w-25"
                  type="text"
                  placeholder="CEP"
                  as={IMaskInput}
                  mask="00000000"
                  onBlur={checkCEP}
                  onChange={(e) => setCEP(e.target.value)}
                  value={cep}
                />
            <Form.Control
              style={{textTransform: 'uppercase'}}
              className="mb-3 w-25"
              type="text"
              placeholder="UF*"
              disabled
              readOnly
              {...register("UF")}
              onChange={(e) => setUf(e.target.value)}
            />
            <Form.Control
              className="mb-3 w-50"
              type="text"
              placeholder="Município*"
              disabled
              readOnly
              {...register("Municipio")}
              onChange={(e) => setMunicipio(e.target.value)}
            />

          </Form.Group>
          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Requisito*"
            maxLength="30"
            onChange={(e) => setRequisito(e.target.value)}
            value={requisito}
            required={true}
          />

          <Form.Group className="mb-3 mx-auto row">

            <InputGroup.Text className="w-50" id="basic-addon1">
              Data Início*
            </InputGroup.Text>
            <InputGroup.Text className="w-50" id="basic-addon1">
              Data Fim*
            </InputGroup.Text>

            <Form.Control
              className="mb-0 w-50"
              type="date"
              placeholder="Início* (yyyy-mm-dd)"
              onChange={(e) => setDataValidadeInicio(e.target.value)}
              value={dataValidadeInicio}
              required={true}
            />
            <Form.Control
              className="mb-0 w-50 "
              type="date"
              placeholder="Fim* (yyyy-mm-dd)"
              onChange={(e) => setDataValidadeFim(e.target.value)}
              value={dataValidadeFim}
              required={true}
            />
          </Form.Group>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="Benefício"
            maxLength="50"
            onChange={(e) => setBeneficio(e.target.value)}
            value={beneficio}
          />

          <Form.Group className="mb-3 mx-auto row">
            <Form.Control
              className="mb-0 w-50"
              type="text"
              as={IMaskInput}
              mask="000000"
              placeholder="Salário"
              onChange={(e) => setSalario(e.target.value)}
              value={salario}
            />
            <Form.Control
              className="mb-0 w-50 "
              type="text"
              as={IMaskInput}
              mask="00000000"
              placeholder="Quantidade de Vaga*"
              onChange={(e) => setQuantidadeVaga(e.target.value)}
              value={quantidadeVaga}
              required={true}
            />
          </Form.Group>

          <Form.Group className="mb-3 mx-auto row">
            <Form.Control
              className="mb-0 w-25"
              type="text"
              placeholder="DDD*"
              as={IMaskInput}
              mask="00"
              onChange={(e) => setDDD(e.target.value)}
              value={ddd}
              required={true}
            />
            <Form.Control
              className="mb-0 w-75 "
              type="integer"
              placeholder="Telefone*"
              as={IMaskInput}
              mask="000000000"
              onChange={(e) => setNumero(e.target.value)}
              value={numero}
              required={true}
            />
          </Form.Group>

          <Form.Control
            className="mb-3"
            type="text"
            placeholder="E-mail de Contato*"
            onChange={(e) => setContatoEmail(e.target.value)}
            value={contatoEmail}
            required={true}
          />

          <Form.Group className="row mb-3 mx-auto">
            <Form.Control            
              className="mb-3 w-50"
              type="text"
              placeholder="Cargo*"
              maxLength="13"
              onChange={onInputChangeCargo}
              value={cargo}
              required={true}
            />

            <Form.Control
              className="mb-3 w-50"
              type="text"
              placeholder="Nome para Contato*"
              onChange={onInputChangeContatoNome}
              value={contatoNome}
              required={true}
            />
          </Form.Group>

          {/* <Form.Group className="mb-3 mx-auto row"> */}
          <Container>
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
                  className="p-0"
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
                    {modalidadeCont ? modalidadeCont : "Contratação*"}
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
                    {modalidadeList?.map(item => <Dropdown.Item onClick={() => setModalidadeCont(item.modalidade)} href="#/action-2">{item.modalidade}</Dropdown.Item>)}
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
                <a style={modalIcon} onClick={handleShowModal2}>
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
                <Dropdown className="w-100">
                  <Dropdown.Toggle
                    style={{
                      width: "100%",
                      fontWeight: "bold",
                    }}
                    variant="light"
                    bg="light"
                    expand="lg"
                  >
                    {tipoJornada ? tipoJornada : "Jornada*"}
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
                    {jornadaList?.map(item => <Dropdown.Item onClick={() => setTipoJornada(item.tipo)} href="#/action-2">{item.tipo}</Dropdown.Item>)}
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
          console.log("TESTE1");
        }} 
        style={btnCadastrar}>
          CONCLUIR
        </Button>
        <Modal
            className="p-5 d-flex justify-content-center align-items-center"
            show={showModal4}
            onHide={handleCloseModal4}
          >
            <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
              Oportunidade cadastrada com sucesso!
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
          <Modal.Title>Cadastrar novo tipo de contratação</Modal.Title>
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
              postModalidade();
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
            CADASTRAR
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Cadastrar novo tipo de jornada</Modal.Title>
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
              postJornada();
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
            OK!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
