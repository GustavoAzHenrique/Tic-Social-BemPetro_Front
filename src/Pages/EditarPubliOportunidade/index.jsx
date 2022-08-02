import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import {
  ContainerEstrutura,
  BotoesTopoCadastrar,
  Oportunidade,
  TopoPag,
} from "./style.jsx";
import BemPetroNavbar from "../../componentes/bempetroNavbar.jsx";
import { FormEditarOportunidade } from "../../componentes/forms/EditarPubli/formEditarOportunidade.jsx";
import { TopoEditarPubli } from "../../componentes/buttons/EditarPubli/TopoEditarPubli.jsx";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
export const EditarPubliOportunidade = () => {
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
      <ContainerEstrutura style={theme}>
        <BemPetroNavbar />
        <TopoPag>
          <TopoEditarPubli />
        </TopoPag>

        <BotoesTopoCadastrar>
          <Button
            variant="info"
            className="w-25"
            style={cor}
          >
            Oportunidade
          </Button>{" "}
        </BotoesTopoCadastrar>

        <Oportunidade>
          <FormEditarOportunidade />
        </Oportunidade>
      </ContainerEstrutura>
    </>
  );
};
