import React, { useContext, useState } from "react";
import "./style.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
import {
  Container,
  ContainerRecuperaSenha,
  EmbrulhoSenha,
  RecuperaSenhaForm,
} from "./style.jsx";
import { RecuperarSenhaInput } from "../../componentes/forms/LoginRecuperarEsqueceu/recuperaSenhaForm.jsx";
import LogoRecuperarSenha from "../../componentes/imagens/logoRecuperarSenha.jsx";
import ButtonRecuperarSenha from "../../componentes/buttons/LoginRecuperarEsqueceu/buttonRecuperarSenha.jsx";

export const RecuperarSenha = () => {
  const navigate = useNavigate();
  const { theme, btnCadastrar, btnDarkMode, ChangeTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const [dados, setDados] = useState({
    email: "",
  });


  function handleSubmit() {
    setLoading(true);
    
    api.put('/recuperarSenha', dados).then(res => {
      setLoading(false);
      alert("E-mail enviado");
      navigate("/login");

    }).catch(error => {
      console.log(error);
      setLoading(false);
    })

  }


  return (
    <Container  style={theme}>
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
      <ContainerRecuperaSenha>
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
          onClick={() => navigate("/login")}
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
          <RecuperaSenhaForm>
            <LogoRecuperarSenha />
            <RecuperarSenhaInput dados={dados} setDados={setDados}/>
            <ButtonRecuperarSenha handleSubmit={handleSubmit} loading={loading}/>
          </RecuperaSenhaForm>
        </EmbrulhoSenha>
      </ContainerRecuperaSenha>
    </Container>
  );
};
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";import api from "../../service/api.js";

