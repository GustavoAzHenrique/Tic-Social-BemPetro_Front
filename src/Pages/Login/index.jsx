import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import "./style.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  ContainerEstrutura,
  ContainerLogin,
  EmbrulhoLogin,
  LoginForm,
} from "./style.jsx";
import { LoginInput } from "../../componentes/forms/LoginRecuperarEsqueceu/formLogin.jsx";
import LogoIconeLogin from "../../componentes/imagens/logoIconeLogin.jsx";
import ButtonLogin from "../../componentes/buttons/LoginRecuperarEsqueceu/buttonLogin.jsx";
import { Navigate } from "react-router-dom";
import api from "../../service/api.js";
import { AuthContext } from "../../context/AuthContext/index.jsx";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const { handleSetToken, token, roles } = useContext(AuthContext);
  const navigate = useNavigate();
  const notify = () => toast.error("Credenciais inválidas");
  const { theme, btnCadastrar, btnDarkMode, ChangeTheme } =
    useContext(ThemeContext);
  const [dados, setDados] = useState({
    email: "",
    senha: "",
  });

  function handleSubmit() {
    api
      .post("/login", dados)
      .then((res) => {
        handleSetToken(res.headers.token);
        localStorage.setItem("Authorization", res.headers.token);
        // setTimeout(function(){
        NavegacaoHome();
        // }, 1000);
      })
      .catch((error) => {
        notify();
      });
  }

  function NavegacaoHome() {
    // navigate("/homerevisor");
    navigate("/home");
    // console.log(roles)
    // roles.map((size) => {
    //   if(size==="editor"){
    //     navigate("/home");
    //   }
    // })
  }

  return (
    <ContainerEstrutura style={theme}>
      {/* {console.log(roles)} */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "10rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              justifyContent: "flex-end",
              textAlign: "end",
            }}
          >
            <label>Dark Mode</label>
          </div>
          <div
            style={{
              width: "20%",
              justifyContent: "center",
              padding: "0.2rem",
              alignItems: "center",
            }}
          >
            <Button
              onClick={() => {
                ChangeTheme();
              }}
              style={btnDarkMode}
            />
          </div>
        </div>
      </div>
      <Container>
        <Row>
          <ContainerLogin>
            <EmbrulhoLogin>
              <LoginForm>
                <Col>
                  <LogoIconeLogin />
                  <LoginInput dados={dados} setDados={setDados} />
                  <ButtonLogin
                    style={btnCadastrar}
                    handleSubmit={handleSubmit}
                  />{" "}
                </Col>
              </LoginForm>
            </EmbrulhoLogin>
          </ContainerLogin>
        </Row>
      </Container>
      <ToastContainer />
    </ContainerEstrutura>
  );
};
