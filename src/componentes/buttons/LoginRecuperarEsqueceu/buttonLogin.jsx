import React,{useContext} from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../../context/ThemeMode/style";

export default function ButtonLogin(props) {
  const { btnLink } = useContext(ThemeContext);
  const navigate = useNavigate()
  return (
    <div>
      <div
        className="botao-login"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          paddingBottom: "10px",
          paddingTop: "30px",
        }}
      >
        <Button
          onClick={props.handleSubmit}
          className="w-75"
          style={{
            borderRadius: "50.35px",
            color: "#EFEFEF",
            backgroundColor: "#51B5C5",
            borderColor: "#51B5C5",
          }}
        >
          ENTRAR
        </Button>{" "}
      </div>

      <div
        className="texto-central mt-3"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <span className="texto1 ">Não possui conta? </span>
        <a className="texto2" style={btnLink} onClick={()=>navigate("/cadastro")}>
          {" "}
          Criar conta.
        </a>
      </div>

      <div
        className="texto-central"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          fontWeight: "bold",
        }}
      >
        <a className="texto2 mt-2" style={btnLink} onClick={()=>navigate("/recuperarsenha")}>
          Esqueceu a senha?
        </a>
      </div>
    </div>
  );
}
