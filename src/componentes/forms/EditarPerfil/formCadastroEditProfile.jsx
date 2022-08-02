import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import { Container } from "./style.jsx";
import { IMaskInput } from "react-imask";
import { useForm } from "react-hook-form";
import Dropdown from "react-bootstrap/Dropdown";
import { AuthContext } from "../../../context/AuthContext/index.jsx";
import { useNavigate } from "react-router-dom";

export const FormCadastroEditProfile = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [atividadeEconomica, setAtividadeEconomica] = useState("Atividade Econômica");
  const [perfilPessoa, setPerfilPessoa] = useState("");
  const [ddd, setDdd] = useState("");
  const [numero, setNumero] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [uf, setUf] = useState("");
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);
  const { register, handleSubmit, setValue } = useForm();

  //Modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [atividade, setAtividade] = useState([]);
  const [atividadeList, setAtividadeList] = useState([]);
  const [telefoneId, setTelefoneId] = useState();
  const [enderecoId, setEnderecoId] = useState();

  const {token, id} = useContext(AuthContext);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const { btnCadastrar, modalIcon } = useContext(ThemeContext);
  const navigate = useNavigate();

  let usuarioDados = {
    email: email,
    senha: senha,
    nomeFantasia: nomeFantasia,
    cnpj: cnpj,
    razaoSocial: razaoSocial,
    atividadeEconomica: atividadeEconomica,
    perfilPessoa: ["editor"]
  };

  let telDados = {
    ddd: ddd,
    numero: numero
  }

  let endDados = {
    logradouro: logradouro,
    numero: numeroCasa,
    complemento: complemento,
    cep: cep,
    municipio: municipio,
    uf: uf
  }

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setValue("UF", data.uf);
        setValue("Logradouro", data.logradouro);
        setValue("Municipio", data.localidade);
        setMunicipio(data.localidade);
        setLogradouro(data.logradouro);
        setUf(data.uf);
      });
  };

  function enviarDadosModal() {
    api.post(`/atividadeEconomica`, {nome: atividade});
  }

  function handleUpdateSubmit() {
    api.put(`/pessoa/juridica/${id}`, usuarioDados, {headers: {Authorization: token}}).then(res => {
      console.log(res);
      handleShowModal3();
    }).catch(error => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
      if(error.response.status == 400) {
        setStatus({
          type: "error",
          mensagem: "Error: " + error.response.headers.errormsg,
        });
      }
    });

    api.put(`/telefone/${telefoneId}`, telDados, {headers: {Authorization: token}}).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    });

    api.put(`/endereco/${enderecoId}`, endDados, {headers: {Authorization: token}}).then(res => {
      console.log(res);
    }).catch(error => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    });
  }

  function getAtivEconoList() {
    api.get('/atividadeEconomica').then(res => {
      setAtividadeList(res.data);
    }).catch(error => {
      console.log(error);
    });
  }

  function getUserData() {
    api.get(`/pessoa/${id}`, {headers: {Authorization: token}}).then(res => {
      setNomeFantasia(res.data.nomeFantasia);
      setDdd(res.data.telefones[0].ddd);
      setNumero(res.data.telefones[0].numero);
      setRazaoSocial(res.data.razaoSocial);
      setCnpj(res.data.cnpj);
      setEmail(res.data.email);
      setCep(res.data.enderecos[0].cep);
      setNumeroCasa(res.data.enderecos[0].numero);
      setComplemento(res.data.enderecos[0].complemento);
      setUf(res.data.enderecos[0].municipio.uf.sigla);
      setMunicipio(res.data.enderecos[0].municipio.nome);
      setLogradouro(res.data.enderecos[0].logradouro);
      setAtividadeEconomica(res.data.atividadeEconomica.nome);
      setTelefoneId(res.data.telefones[0].id);
      setEnderecoId(res.data.enderecos[0].id);
    }).catch(error => {
      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    });
  }

  useEffect(() => {
    getAtivEconoList();

    if(token && id) {
      getUserData();
    }
  }, [token, id])

  return (
    <>
      {console.log(endDados)}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {status.type === "error" &&
          <p
            style={{
              color: "#ff0000",
              position: "relative",
              top: "1vh",
            }}
          >
            {status.mensagem}
          </p>}
        <Container>
          <div></div>
          <Form className="m-2">
            {/* <Form.Group
              className="row"
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "30px",
              }}
            > */}
              <Form.Group className="mb-2  w-100">
                <Form.Control
                  className="mb-3"
                  type="text"
                  as={IMaskInput}
                  maxLenght="30"
                  placeholder="Nome Fantasia*"
                  autoFocus
                  onChange={(e) => setNomeFantasia(e.target.value)}
                  value={nomeFantasia}
                />

                <Form.Group className="mb-3 mx-auto row">
                  <Form.Control
                    className="mb-0 w-25"
                    type="text"
                    placeholder="DDD"
                    as={IMaskInput}
                    mask="00"
                    autoFocus
                    onChange={(e) => setDdd(e.target.value)}
                    value={String(ddd)}
                  />
                  <Form.Control
                    className="mb-0 w-75 "
                    type="text"
                    autoFocus
                    placeholder="Telefone"
                    as={IMaskInput}
                    mask="000000000"
                    onChange={(e) => setNumero(e.target.value)}
                    value={String(numero)}
                  />
                </Form.Group>

                <Form.Control
                  className="mb-3"
                  type="text"
                  autoFocus
                  as={IMaskInput}
                  maxLenght="30"
                  placeholder="Razão Social*"
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  value={razaoSocial}
                />

                <Form.Control
                  className="mb-3"
                  type="text"
                  as={IMaskInput}
                  mask="00000000000000"
                  placeholder="CNPJ*"
                  onChange={(e) => setCnpj(e.target.value)}
                  value={cnpj}
                />

                <Form.Control
                  className="mb-3"
                  type="text"
                  placeholder="E-mail*"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </Form.Group>
            {/* </Form.Group> */}
          </Form>
          <Form className="m-2">
            <Form.Group className="mb-2  w-100 ">
              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-75"
                  type="text"
                  as={IMaskInput}
                  mask="00000000"
                  placeholder="CEP"
                  onBlur={checkCEP}
                  onChange={(e) => setCep(e.target.value)}
                  value={cep}
                />
                <Form.Control
                  className="mb-0 w-25"                  
                  type="text"
                  disabled
                  readOnly
                  placeholder="UF"
                  {...register("UF")}
                  onChange={(e) => setUf(e.target.value)}
                  value={"UF"}
                />
              </Form.Group>

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-25"
                  type="text"
                  autoFocus
                  as={IMaskInput}
                  mask="00000"
                  placeholder="Numero"
                  onChange={(e) => setNumeroCasa(e.target.value)}
                  value={String(numeroCasa)}
                />
                <Form.Control
                  className="mb-0 w-75 "                  
                  type="text"
                  autoFocus
                  as={IMaskInput}
                  maxLenght="30"
                  placeholder="Complemento"
                  {...register("complemento")}
                  onChange={(e) => setComplemento(e.target.value)}
                  value={complemento}
                />

                <Form.Control
                  className="mt-3  mx-auto"
                  type="text"
                  autoFocus                
                  placeholder="Municipio"
                  disabled
                  readOnly
                  {...register("Municipio")}
                  onChange={(e) => setMunicipio(e.target.value)}
                  value={"Municipio"}
                />

                <Form.Control
                  className=" mt-3  mx-auto"
                  type="text"
                  autoFocus
                  placeholder="Logradouro"
                  disabled
                  readOnly                
                  {...register("Logradouro")}
                  onChange={(e) => setLogradouro(e.target.value)}
                  value={"Logradouro"}
                />
                
                <Form.Control
                  className="mt-3"
                  type="password"
                  placeholder="Senha*"
                  toggleMask
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Container>
        <Container>
          <div></div>
          {/* <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "50%",
            }}
          > */}
          <div
            style={{
              display: "flex",
              width: "100%",
              marginBottom: "1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "90%",
                padding: "8px",
              }}
            >
              <Dropdown
                style={{
                  width: "100%",
                  height: "38px",
                }}
              >
                <Dropdown.Toggle
                  style={{
                    width: "100%",
                    height: "38px",
                    // top: "4.5vh",
                    // fontSize: "1.0vw",
                    fontWeight: "bold",
                  }}
                  variant="light"
                  bg="light"
                  expand="lg"
                >
                  {atividadeEconomica}
                </Dropdown.Toggle>

                <Dropdown.Menu
                  variant="white"
                  bg="white"
                  expand="lg"
                  style={
                    {
                      // position: "absolute",
                      // width: "40%",
                    }
                  }
                >
                  {atividadeList?.map((item) => (
                    <Dropdown.Item onClick={() => setAtividadeEconomica(item.nome)} href="#/action-2">{item.nome}</Dropdown.Item>
                  ))}
                  {console.log(atividadeEconomica)}
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <div
              style={{
                display: "flex",
                flewDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "10%",
              }}
            >
              <a style={modalIcon} onClick={handleShowModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="25px"
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
          </div>
        </Container>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar nova atividade</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
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
              CADASTRAR
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            variant="info"
            onClick={handleUpdateSubmit}
            style={btnCadastrar}
          >
            ATUALIZAR
          </Button>
          <Modal
            className="p-5 d-flex justify-content-center align-items-center"
            show={showModal3}
            onHide={handleCloseModal3}
          >
            <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
              Perfil atualizado com sucesso!
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
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
