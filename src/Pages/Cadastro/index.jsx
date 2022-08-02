import React, { useState, useContext } from "react";
import { FormCadastroEmpresa } from "../../componentes/forms/Cadastro/formCadastroEmpresa.jsx";
import { LogoIconeCadastro } from "../../componentes/imagens/logoIconeCadastro.jsx";
import { Container, Foto, BotoesTopo, Empresa, Pessoa } from "./style.jsx";
import Button from "react-bootstrap/Button";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
import { FormCadastroPessoa } from "../../componentes/forms/Cadastro/formCadastroPessoa.jsx";

export const Cadastro = () => {
  const [section, setSection] = useState(0);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [toggleClicked, setToogle] = React.useState(true);
  const [toggle2Clicked, setToogle2] = React.useState(false);
  const [cor, setCor] = React.useState();
  const [cor2, setCor2] = React.useState();
  const { theme, ChangeTheme, btnClicado, btnNaoClicado, btnDarkMode } =
    useContext(ThemeContext);
  React.useEffect(() => {
    setCor(() => (toggleClicked ? btnClicado : btnNaoClicado));
    setCor2(() => (toggle2Clicked ? btnClicado : btnNaoClicado));
  }, [toggleClicked, toggle2Clicked, btnNaoClicado]);

  return (
    <Container style={theme}>
      <div style={{ display: "flex", flexDirection: "row",justifyContent: "flex-end", alignItems:"center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "10rem",
            alignItems:"center"
          }}
        >
          <div style={{ width: "80%",justifyContent: "flex-end", textAlign:"end" }}>
            <label>Dark Mode</label>
          </div>
          <div style={{ width: "20%",justifyContent: "center", padding:"0.2rem", alignItems:"center"}}>
            <Button onClick={() => ChangeTheme()} style={btnDarkMode} />
          </div>
        </div>
      </div>
      <Foto>
        <LogoIconeCadastro />
      </Foto>
      <BotoesTopo>
        <Button
          variant="info"
          className="w-25"
          onClick={() => {
            setSection(0);
            setToogle(true);
            setToogle2(false);
          }}
          style={cor}
          //  style={{color: cor, fontWeight: "bold"}}
        >
          Empresa
        </Button>{" "}
        <Button
          className="w-25"
          variant="light"
          onClick={() => {
            setSection(1);
            setToogle(false);
            setToogle2(true);
          }}
          // style={{ fontWeight: "bold" }}
          style={cor2}
        >
          Pessoa
        </Button>{" "}
      </BotoesTopo>

      {section === 0 && (
        <Empresa>
          {/* <Formulario> */}
          {/* <div> */}

          <FormCadastroEmpresa />
          {/* </div> */}
          {/* </Formulario> */}
        </Empresa>
      )}

      {section === 1 && (
        <Pessoa>
          {/* <Formulario2> */}
          <FormCadastroPessoa />
          {/* </Formulario2> */}
        </Pessoa>
      )}
    </Container>
  );
};
