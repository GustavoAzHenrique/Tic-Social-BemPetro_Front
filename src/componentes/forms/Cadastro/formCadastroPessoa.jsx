import React, { useState, useContext, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from "../../../service/api.js";
import { useForm } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { Navigate, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import { AuthContext } from "../../../context/AuthContext/index.jsx";
import { Container } from "./style.jsx";
import { ThemeContext } from "../../../context/ThemeMode/style.jsx";
import { ReRenderContext } from "../../../context/ReRender/Rerender.jsx";

export const FormCadastroPessoa = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [nome, setNome] = useState("");
  const [instituicaoEnsino, setInstituicaoEnsino] = useState("");
  const [grauInstrucao, setGrauInstrucao] = useState("");
  const [perfilPessoa, setPerfilPessoa] = useState("");
  const [perfilPessoaModal, setPerfilPessoaModal] = useState("");
  const [ddd, setDDD] = useState("");
  const [numeroTel, setNumeroTel] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [numeroRes, setNumeroRes] = useState("");
  const [complemento, setComplemento] = useState("");
  const [cep, setCEP] = useState("");
  const [municipio, setMunicipio] = useState("");
  const [perfil, setPerfil] = useState([]);
  const [uf, setUF] = useState("");
  const { btnCadastrar, modalIcon } = useContext(ThemeContext);
  const navigate = useNavigate();
  const handleCloseModal4 = () => setShowModal4(false);
  const handleShowModal4 = () => setShowModal4(true);
  const [showModal4, setShowModal4] = useState(false);

  const [status, setStatus] = useState({
    type: "",
    mensagem: "",
  });

  const onInputChangeNome = (e) => {
    const { value } = e.target;
    console.log("Input value: ", value);

    const re = /^[a-z???????????????????????????????? ]+$/i;
    if (value === "" || re.test(value)) {
      setNome(value);
    }
  };

  // const onInputChangeEmail = (e) => {
  //   const { value } = e.target;
  //   console.log("Input value: ", value);

  //   const re = /^w+[+.w-]*@([w-]+.)*w+[w-]*.([a-z]{2,4}|d+)$/i;
  //   if (value === "" || re.test(value)) {
  //     setEmail(value);
  //   }
  // };

  const { register, handleSubmit, setValue } = useForm();

  let dados = {
    email: email,
    senha: senha,
    dataNascimento: dataNascimento,
    nome: nome,
    perfilPessoa: [perfilPessoa],
    telefones: [
      {
        ddd: ddd,
        numero: numeroTel,
      },
    ],
    enderecos: [
      {
        logradouro: logradouro,
        numero: numeroRes,
        complemento: complemento,
        cep: cep,
        municipio: municipio,
        uf: uf,
      },
    ],
  };

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
        setUF(data.uf);
      });
  };

  function enviarDados() {
    if (!validate()) return;
    handleShowModal4();

    api.post(`/pessoa/fisica`, dados).then(res => {
    }).catch(error => {
      if(error.response.status == 400) {

        if(error.response.data.email)
          setStatus({
            type: "error",
            mensagem: "Error: Email inv??lido!",
          });
        if(error.response.data.dataNascimento)
          setStatus({
            type: "error",
            mensagem: "Error: Data de nascimento deve ser anterior a data atual!",
          });
        if(error.response.headers.errormsg)
          setStatus({
            type: "error",
            mensagem: "Error: " + error.response.headers.errormsg,
          });
      }
    });
  }

  function validate() {
    if (!dados.nome)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio informar o nome completo!",
      });
    if (!dados.telefones[0].ddd || dados.telefones[0].ddd.length <=1)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio informar o DDD de forma v??lida!",
      });
    if (!dados.telefones[0].numero || dados.telefones[0].numero.length <=8)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio informar o n??mero do telefone de forma v??lida!",
      });
    if (!dados.dataNascimento)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio informar a data de nascimento!",
      });
    if (!dados.email)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio preencher o campo Email!",
      });
    if (!dados.perfilPessoa[0])
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio escolher um perfil!",
      });
    if (!dados.enderecos[0].cep || dados.enderecos[0].cep.length <=7)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio preencher o campo CEP de forma v??lida!",
      });
    if (!dados.enderecos[0].numero)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio preencher o n??mero do endere??o!",
      });
    if (!dados.senha)
      return setStatus({
        type: "error",
        mensagem: "Error: Necess??rio preencher o campo Senha!",
      });
      if (dados.senha.length <=4 )
      return setStatus({
        type: "error",
        mensagem: "Error: Digite uma senha maior que 4 digitos!",
      });

    return true;
  }

  //Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handlePost = () => setShow(true);
  const { ChangeRender, renderCount } = useContext(ReRenderContext);
  let dadosModal = {
    perfil: perfilPessoaModal,
  };

  //const {token} = useContext(AuthContext);
  function enviarDadosModal() {
    // api.post(`/perfilPessoa`, dadosModal, {headers: {Authorization: token}});
    api.post(`/perfilPessoa`, dadosModal);
    // getDadosPerfilPessoa();
    ChangeRender();
  }

  useEffect(() => {
    getDadosPerfilPessoa();
  }, [renderCount]);

  const getDadosPerfilPessoa = async () => {
    api
      .get("/perfilPessoa")
      .then((result) => {
        console.log("dados Perfil Pessoa:" + JSON.stringify(result.data));
        setPerfil(result.data);
        // SetDropDown();
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));
      });
  };

  return (
    <>
      {console.log(dados.perfilPessoa)}
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
        <Container>
          <div></div>
          <Form className="m-2">
            <Form.Group className="mb-2 w-100">
              <Form.Control
                className="mb-3"
                type="text"
                maxLength={50}
                placeholder="Nome Completo*"
                autoFocus
                onChange={onInputChangeNome}
                value={nome}
              />

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-25"
                  type="text"
                  placeholder="DDD"
                  as={IMaskInput}
                  mask="00"
                  onChange={(e) => setDDD(e.target.value)}
                  value={ddd}
                />
                <Form.Control
                  className="mb-0 w-75 "
                  type="text"
                  as={IMaskInput}
                  mask="000000000"
                  placeholder="Telefone"
                  onChange={(e) => setNumeroTel(e.target.value)}
                  value={numeroTel}
                />
              </Form.Group>

              <Form.Control
                className="mb-3"
                type="date"
                placeholder="Data de Nascimento (yyyy-mm-dd)"
                onChange={(e) => {
                  setDataNascimento(e.target.value);
                  console.log(dataNascimento);
                }}
                value={dataNascimento}
              />

              <Form.Control
                className="mb-3"
                type="text"
                
                placeholder="E-mail*"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </Form.Group>
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
                    {perfilPessoa ? perfilPessoa : "Perfil*"}
                  </Dropdown.Toggle>

                  <Dropdown.Menu variant="white" bg="white" expand="lg">
                    {perfil.map((item) => (
                      <Dropdown.Item onClick={() => setPerfilPessoa(item.perfil)} eventKey={item.id} href="#/action-2">
                        {item.perfil}
                      </Dropdown.Item>
                    ))}
                 
                    {console.log(perfil)}
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
                <a style={modalIcon} onClick={handleShow}>
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
            </div>
          </Form>
          <Form className="m-2">
            <Form.Group className="mb-2  w-100 ">
              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="w-75"
                  type="text"
                  placeholder="CEP"
                  as={IMaskInput}
                  mask="00000000"
                  onBlur={checkCEP}
                  onChange={(e) => setCEP(e.target.value)}
                  value={cep}
                />
                <Form.Control
                  className="mb-0 w-25 "
                  type="text"
                  placeholder="UF"
                  disabled
                  readOnly
                  {...register("UF")}
                  onChange={(e) => setUF(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mx-auto row">
                <Form.Control
                  className="mb-0 w-25"
                  type="text"
                  as={IMaskInput}
                  mask="00000"
                  placeholder="Numero"
                  onChange={(e) => setNumeroRes(e.target.value)}
                  value={numeroRes}
                />
                <Form.Control
                  className="mb-0 w-75 "
                  type="text"
                  as={IMaskInput}
                  maxLenght="20"
                  placeholder="Complemento"
                  {...register("complemento")}
                  onChange={(e) => setComplemento(e.target.value)}
                  value={complemento}
                />

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
                  toggleMask
                  maxLength="15"
                  placeholder="Senha*"
                  onChange={(e) => setSenha(e.target.value)}
                  value={senha}
                />
              </Form.Group>
            </Form.Group>
          </Form>
        </Container>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Cadastrar novo perfil</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  type="text"
                  placeholder="Cadastrar novo perfil"
                  autoFocus
                  name="perfil"
                  value={perfilPessoaModal}
                  onChange={(e) => {
                    setPerfilPessoaModal(e.target.value);
                    
                  }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                enviarDadosModal();
                handleClose();
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
            className="mb-5"
            variant="info"
            onClick={() => {
              enviarDados();
              console.log("TESTE1");
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
    </>
  );
};
