import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { ThemeContext } from "../../../context/ThemeMode/style";

export default function ButtonConfirmarSenha() {
  const { btnCadastrar } = useContext(ThemeContext);
  return (
    <div
      className="botao-Confirmar"
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        paddingBottom: "10px",
        paddingTop: "35px",
      }}
    >
      <Button className="w-75" style={btnCadastrar}>
        CONFIRMAR
      </Button>{" "}
    </div>
  );
}
