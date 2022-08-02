import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import api from "../../../service/api.js";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { Container } from "./style.jsx";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import { ReRenderContext } from "../../../context/ReRender/Rerender.jsx";
export const FormCadastroEmpresa = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeFantasia, setNomeFantasia] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [razaoSocial, setRazaoSocial] = useState("");
  const [atividadeEconomica, setAtividadeEconomica] = useState("");
  const [perfilPessoa, setPerfilPessoa] = useState("");
  const [ddd, setDdd] = useState("");
  const [numeroTel, setNumeroTel] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numeroCasa, setNumeroCasa] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCep] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [uf, setUf] = useState("");
  const { ChangeRender, renderCount } = useContext(ReRenderContext);
  const navigate = useNavigate();
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);
  const [showModal4, setShowModal4] = useState(false);

  const { register, handleSubmit, setValue } = useForm();
  const [teste, setTeste] = useState([]);
  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const { btnCadastrar, modalIcon } = useContext(ThemeContext);
  let dados = {
    email: email,
    senha: senha,
    nomeFantasia: nomeFantasia,
    cnpj: cnpj,
    razaoSocial: razaoSocial,
    atividadeEconomica: atividadeEconomica,
    perfilPessoa: ["editor"],
    telefones: [
      {
        ddd: ddd,
        numero: numeroTel,
      },
    ],
    enderecos: [
      {
        logradouro: logradouro,
        numero: numeroCasa,
        complemento: complemento,
        cep: cep,
        municipio: municipio,
        uf: uf,
      },
    ],
  };

  function enviarDados() {
    if (!validate()) return;
    handleShowModal4();
    api
      .post(`/pessoa/juridica`, dados)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        if(error.response.status == 400) {

          if(error.response.data.cnpj)
            setStatus({
              type: "error",
              mensagem: "Error: CNPJ inválido!",
            });
          
          if(error.response.data.email)
            setStatus({
              type: "error",
              mensagem: "Error: Email inválido!",
            });
            
          if(error.response.headers.errormsg)
            setStatus({
              type: "error",
              mensagem: "Error: " + error.response.headers.errormsg,
            });
        }
      });
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(cep.target.value.lenght);
    }
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setValue("UF", data.uf);
        setValue("Logradouro", data.logradouro);
        setValue("Municipio", data.localidade);
        setMunicipio(data.localidade);
        setLogradouro(data.logradouro);
        setUf(data.uf);
      });
  };

  function validate() {
    if (!dados.nomeFantasia)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Nome Fantasia!",
      });
    if (!dados.telefones[0].ddd || dados.telefones[0].ddd.length <=1)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário informar o DDD de forma válida!",
      });
    if (!dados.telefones[0].numero || dados.telefones[0].numero.length <=8 )
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário informar o número do telefone!",
      });
    if (!dados.razaoSocial)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Razão Social!",
      });
    if (!dados.cnpj || dados.cnpj.length <=13 )
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo CNPJ de forma válida!",
      });
    if (!dados.email )
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Email!",
      });
    if (!dados.atividadeEconomica)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário escolher uma atividade econômica",
      });
    if (!dados.enderecos[0].cep || dados.enderecos[0].cep.length <=7 )
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo CEP de forma válida!",
      });
    if (!dados.enderecos[0].numero)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o número do endereço!",
      });
    if (!dados.senha)
      return setStatus({
        type: "error",
        mensagem: "Error: Necessário preencher o campo Senha!",
      });
      if (dados.senha.length <=4 )
      return setStatus({
        type: "error",
        mensagem: "Error: Digite uma senha maior que 4 digitos!",
      });

    return true;
  }

  //Modal
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
  const [atividade, setAtividade] = useState([]);
  const [nomeAtividade, setNomeAtividade] = useState([]);
  let dadosModal = {
    nome: nomeAtividade,
    codigo: 2,
  };

  function enviarDadosModal() {
    if (nomeAtividade === "") {
      return;
    }
    api.post(`/atividadeEconomica`, dadosModal);
    // getDadosAtividadeEconomica();
    ChangeRender();
  }

  useEffect(() => {
    getDadosAtividadeEconomica();
  }, [renderCount]);

  const getDadosAtividadeEconomica = async () => {
    api
      .get("/atividadeEconomica")
      .then((result) => {
        console.log(
          "dados das atividades economicas" + JSON.stringify(result.data)
        );
        setAtividade(result.data);
        // SetDropDown();
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));
      });
  };

  // function SetDropDown(){
  //
  // }

  return (
    <>
      {/* <div style={{ alignItems: "center", justifyContent: "center" }}> */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {status.type === "error" ? (
          <p
            style={{
              color: "#ff0000",
              position: "relative",
              top: "1vh",
            }}
          >
            {status.mensagem}
          </p>
        ) : (
          ""
        )}
        {/* <Form className="row d-flex align-items-center justify-content-center"> */}
        {/* {status.type === "error" ? (
              <p
                style={{
                  color: "#ff0000",
                  position: "relative",
                  left: "35vw",
                  top: "5.5vh",
                }}
              >
                {status.mensagem}
              </p>
            ) : (
              ""
            )} */}
        <Container>
          {/* <Form.Group
              className="row"
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            > */}
          {/* <div
            style={{
              display: "flex",
              flewDirection: "row",
              alignItems:"flex-end",
              justifyContent: "flex-end",
            }}
          > */}
          <div></div>
          <Form className="m-2">
            <Form.Group className="mb-2 w-100 ">
              <Form.Control
                className="mb-3"
                type="text"
                autoFocus={true}
                as={IMaskInput}
                placeholder="Nome Fantasia*"
                maxLength={50}
                onChange={(e) => setNomeFantasia(e.target.value)}
                value={nomeFantasia}
              />
              {/* {console.log(nomeFantasia)} */}
              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-25"
                  type="text"
                  placeholder="DDD"
                  as={IMaskInput}
                  mask="00"
                  
                  onChange={(e) => setDdd(e.target.value)}
                  value={ddd}
                />
                <Form.Control
                  className="mb-0 w-75 "
                  type="text"
                  
                  placeholder="Telefone"
                  as={IMaskInput}
                  mask="000000000"
                  onChange={(e) => setNumeroTel(e.target.value)}
                  value={numeroTel}
                />
              </Form.Group>

              <Form.Control
                className="mb-3"
                type="text"
               
                as={IMaskInput}
                placeholder="Razão Social*"
                maxLength={50}
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
              {/* {console.log(cnpj)} */}
              <Form.Control
                type="text"
                placeholder="E-mail*"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
          </Form>
          {/* </div> */}
          {/* <div
            style={{
              display: "flex",
              flewDirection: "row",
              justifyContent: "flex-start",
            }}
          > */}
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
                />
              </Form.Group>

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-25"
                  type="text"
                  
                  as={IMaskInput}
                  mask="00000"
                  placeholder="Numero"
                  onChange={(e) => setNumeroCasa(e.target.value)}
                  value={numeroCasa}
                />
                <Form.Control
                  className="mb-0 w-75 "
                  type="text"
                  
                  as={IMaskInput}
                  maxLenght="30"
                  placeholder="Complemento"
                  {...register("complemento")}
                  onChange={(e) => setComplemento(e.target.value)}
                  value={complemento}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3 row"> */}

              <Form.Control
                className="mt-3  mx-auto"
                type="text"
               
                placeholder="Municipio"
                disabled
                readOnly
                {...register("Municipio")}
                onChange={(e) => setMunicipio(e.target.value)}
              />

              <Form.Control
                className=" mt-3  mx-auto"
                type="text"
               
                placeholder="Logradouro"
                disabled
                readOnly
                {...register("Logradouro")}
                onChange={(e) => setLogradouro(e.target.value)}
              />
              <Form.Control
                className="mt-3"
                type="password"
                placeholder="Senha*"
                toggleMask
                onChange={(e) => setSenha(e.target.value)}
                value={senha}
              />
              {/* </Form.Group> */}
            </Form.Group>
            {/* </Form.Group> */}
          </Form>
          {/* </div> */}
        </Container>
        {/* </Form> */}

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
                  {atividadeEconomica ? atividadeEconomica : "Atividade Economica*"}
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
                  {atividade.map((item) => (
                    <Dropdown.Item
                      onClick={() => setAtividadeEconomica(item.nome)}
                      eventKey={item.id}
                      href="#/action-2"
                    >
                      {item.nome}
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
                  value={nomeAtividade}
                  onChange={(e) => setNomeAtividade(e.target.value)}
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
            onClick={() => {
              enviarDados();
              // console.log("TESTE1");
            }}
            style={btnCadastrar}
          >
            CADASTRAR
          </Button>

          <Modal
            className="p-5 d-flex justify-content-center align-items-center"
            show={showModal4}
            onHide={handleCloseModal4}
          >
            <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
              Perfil cadastrado com sucesso!
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
                  navigate("/login");
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
      </div>
      {/* </div> */}
    </>
  );
};
