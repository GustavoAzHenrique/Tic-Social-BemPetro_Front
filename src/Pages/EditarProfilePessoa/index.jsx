import React, { useContext } from "react";
import {
  TopPessoa,
  ContainerProfilePessoa,
  ColunaPessoa,
  FormularioEditPessoa,
} from "./style";
import { FormEditPessoaFisica } from "../../componentes/forms/EditarPerfil/formEditPessoaFisica";
import BemPetroNavbar from "../../componentes/bempetroNavbar";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
import { useNavigate } from "react-router-dom";
export const ProfilePessoa = () => {
  const { theme, modalIcon, ChangeTheme, btnClicado, btnNaoClicado } =
    useContext(ThemeContext);
    const navigate = useNavigate()
  return (
    <ContainerProfilePessoa style={theme}>
      <BemPetroNavbar />
      <TopPessoa>
        <div
          style={{
            width: "27%",
          }}
        >
          <div
            style={{
              marginLeft: "50%",
            }}
          >
            <a
              className="imagemVoltar"
              style={modalIcon}
              onClick={() => {
                navigate("/home");
              }}
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
          </div>
        </div>
        <h4
          style={{
            marginBottom: "0",
            // position: "relative",
            fontWeight: "bold",
            // left: "25vw",
            // top: "8vh",
          }}
        >
          Editar Perfil
        </h4>
      </TopPessoa>

      <FormularioEditPessoa>
        <FormEditPessoaFisica />
      </FormularioEditPessoa>
    </ContainerProfilePessoa>
  );
};
