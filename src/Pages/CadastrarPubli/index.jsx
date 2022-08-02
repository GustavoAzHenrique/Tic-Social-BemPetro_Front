import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import {
  ContainerEstrutura,
  ProfileModal,
  BotaoCascataProfile,
  BotoesTopoCadastrar,
  Evento,
  FormularioEditEvento,
  Noticia,
  FormularioEditNoticia,
  Oportunidade,
  FormularioEditOportunidade,
  TopoPag,
} from "./style.jsx";
import BemPetroNavbar from "../../componentes/bempetroNavbar.jsx";
import { ModalEmpresaEditProfile } from "../../componentes/modals/EditarPerfil/modalEmpresaEditProfile.jsx";
import { DropDownEditPerfil } from "../../componentes/buttons/EditarPerfil/dropDownEditPerfil.jsx";
import { FormCadastrarPubliEvento } from "../../componentes/forms/CadastrarPubli/formCadastrarPubliEvento.jsx";
import { FormCadastrarPubliNoticia } from "../../componentes/forms/CadastrarPubli/formCadastrarPubliNoticia.jsx";
import { FormCadastrarPubliOportunidade } from "../../componentes/forms/CadastrarPubli/formCadastrarPubliOportunidade.jsx";
import { TopoCadastrarPubli } from "../../componentes/buttons/CadastrarPubli/TopoCadastrarPubli.jsx";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
export const CadastrarPubli = () => {
  const [section, setSection] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [toogle, setToogle] = React.useState(true);
  const [toogle2, setToogle2] = React.useState(false);
  const [toogle3, setToogle3] = React.useState(false);
  const [cor, setCor] = React.useState();
  const [cor2, setCor2] = React.useState();
  const [cor3, setCor3] = React.useState();
  const { theme, ChangeTheme, btnClicado, btnNaoClicado, toggle } =
    useContext(ThemeContext);
  React.useEffect(() => {
    console.log(toggle);
    setCor(() => (toogle ? btnClicado : btnNaoClicado));
    setCor2(() => (toogle2 ? btnClicado : btnNaoClicado));
    setCor3(() => (toogle3 ? btnClicado : btnNaoClicado));
  }, [toogle, toogle2, toogle3, btnClicado, toggle]);

  return (
    <>
      <BemPetroNavbar />
      <ContainerEstrutura style={theme}>
        <TopoPag>
          <TopoCadastrarPubli />
        </TopoPag>
        <h5
          style={{
            fontWeight: "bold",
            marginBottom: "0",
          }}
        >
          O que você pretende divulgar?
        </h5>
        <BotoesTopoCadastrar>
          <Button
            variant="info"
            className="w-100
            "
            onClick={() => {
              setSection(0);
              setToogle(true);
              setToogle2(false);
              setToogle3(false);
            }}
            style={cor}
            //  style={{color: cor, fontWeight: "bold"}}
          >
            Evento
          </Button>{" "}
          <Button
            className="w-100"
            variant="light"
            onClick={() => {
              setSection(1);
              setToogle(false);
              setToogle2(true);
              setToogle3(false);
              console.log("Teste1");
            }}
            // style={{ fontWeight: "bold" }}
            style={cor2}
          >
            Notícia
          </Button>{" "}
          <Button
            className="w-100"
            variant="light"
            onClick={() => {
              setSection(2);
              setToogle(false);
              setToogle2(false);
              setToogle3(true);
            }}
            // style={{ fontWeight: "bold" }}
            style={cor3}
          >
            Oportunidade de Emprego
          </Button>{" "}
        </BotoesTopoCadastrar>
        {/* Colorcar texto e toogle triplo */}

        {section === 0 && (
          <Evento>
            {/* <FormularioEditEvento> */}
            <FormCadastrarPubliEvento />
            {/* </FormularioEditEvento> */}
          </Evento>
        )}

        {section === 1 && (
          <Evento>
            <FormCadastrarPubliNoticia />
          </Evento>
        )}

        {section === 2 && (
          <Evento>
            <FormCadastrarPubliOportunidade />
          </Evento>
        )}
      </ContainerEstrutura>
    </>
  );
};
