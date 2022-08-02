import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import {
  ContainerEstrutura,
  BotoesTopoCadastrar,
  Evento,
  TopoPag,
} from "./style.jsx";
import BemPetroNavbar from "../../componentes/bempetroNavbar.jsx";
import { FormEditarEvento } from "../../componentes/forms/EditarPubli/formEditarEvento.jsx";
import { TopoEditarPubli } from "../../componentes/buttons/EditarPubli/TopoEditarPubli.jsx";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
export const EditarPubli = () => {
  const [toogle, setToogle] = React.useState(true);
  const [cor, setCor] = React.useState();
  const { theme, ChangeTheme, btnClicado, btnNaoClicado, toggle } =
    useContext(ThemeContext);
  React.useEffect(() => {
    console.log(toggle);
    setCor(() => (toogle ? btnClicado : btnNaoClicado));
  }, [toogle]);

  return (
    <>
        <BemPetroNavbar />
      <ContainerEstrutura style={theme}>
        <TopoPag>
          <TopoEditarPubli />
        </TopoPag>

        <BotoesTopoCadastrar>
          <Button
            variant="info"
            className="w-25"
            style={cor}
          >
            Evento
          </Button>{" "}
        </BotoesTopoCadastrar>

        <Evento>
          <FormEditarEvento />
        </Evento>
      </ContainerEstrutura>
    </>
  );
};
