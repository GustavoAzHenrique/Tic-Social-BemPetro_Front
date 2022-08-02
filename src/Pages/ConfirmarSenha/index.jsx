import React,{useContext} from "react";
import Button from "react-bootstrap/Button";
import "./style.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import LogoConfirmar from "../../componentes/imagens/logoConfirmar.jsx";
import {
  Container,
  ContainerConfirmarSenha,
  EmbrulhoSenha,
  ConfirmarSenhaForm,
} from "./style.jsx";
import { ConfirmarSenhaInput } from "../../componentes/forms/LoginRecuperarEsqueceu/confirmarSenhaForm";
import ButtonConfirmarSenha from "../../componentes/buttons/LoginRecuperarEsqueceu/buttonConfirmarSenha.jsx";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";

export const ConfirmarSenha = () => {
  const { theme, btnCadastrar, btnDarkMode, ChangeTheme } =
    useContext(ThemeContext);
  const navigate= useNavigate()
  return (
    <Container style={theme}>
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
      <ContainerConfirmarSenha>
      <a
        className="imagemVoltar"
        style={{
          color: "#51B5C5",
          position: "relative",
          right: "5vw",
          bottom: "25vh",
         
          width: "35px",
          justifyContent: "flex-end",

          flexWrap: "wrap",
        }}
        onClick={()=>navigate("/recuperarsenha")}
      >
        {" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36px"
          height="85px"
          fill="currentColor"
          class="bi bi-chevron-left"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
          />
        </svg>
      </a>
        <EmbrulhoSenha>
          <ConfirmarSenhaForm>
            <LogoConfirmar />
            <ConfirmarSenhaInput />
            <ButtonConfirmarSenha />
          </ConfirmarSenhaForm>
        </EmbrulhoSenha>
      </ContainerConfirmarSenha>
    </Container>
  );
};
