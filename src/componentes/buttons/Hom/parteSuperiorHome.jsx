import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeMode/style";

export default function ParteSuperiorHome() {
  const { theme, ChangeTheme, btnSquare } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        style={{ width: "50%", textAlign: "center", justifyContent: "center" }}
      >
        <text
          style={{
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          Minhas Publicações
        </text>
      </div>
      <div
        style={{
          display: "flex",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          // href="/cadastrarpubli"

          onClick={() => {
            navigate("/cadastrarpubli");
            console.log("TESTE1");
          }}
          style={btnSquare}
        >
          CADASTRAR PUBLICAÇÃO
        </Button>
      </div>
    </>
  );
}
