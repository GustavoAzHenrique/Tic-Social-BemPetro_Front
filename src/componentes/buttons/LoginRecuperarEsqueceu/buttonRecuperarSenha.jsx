import React, {useContext} from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeMode/style";
import ReactLoading from 'react-loading';

export default function ButtonRecuperarSenha({handleSubmit, loading}) {
  const { theme, btnCadastrar, btnDarkMode, ChangeTheme } = useContext(ThemeContext);
  
  return (
    <div
      className="botao-confirma"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: "10px",
        paddingTop: "10px",
      }}
    >
      <div
        className="texto-central"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <span
          className="texto1"
          style={{
            color: "#929292",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "2.8%",
            paddingLeft: "10%",
          }}
        >
          Você receberá um e-mail para realizar a redefinição de senha.
        </span>
      </div>
      <Button
      onClick={handleSubmit}
        className="w-75 mt-4"
        style={btnCadastrar}
        variant="info"
      >
        {loading ? <ReactLoading type="spin" width={35} /> : "CONFIRMAR"}
      </Button>{" "}
    </div>
  );
}
