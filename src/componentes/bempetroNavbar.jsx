import React, { useState, useContext, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logoMini from "../img/logoMini.png";
import logoMiniDark from "../img/logoMiniDark.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import NavbarToggle from "react-bootstrap/esm/NavbarToggle";
import Toggle from "react-toggle";
import { ThemeContext } from "../context/ThemeMode/style";
import api from "../service/api";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function BemPetroNavbar() {
  const handleCloseModal3 = () => setShowModal3(false);
  const handleShowModal3 = () => setShowModal3(true);
  const [showModal3, setShowModal3] = useState(false);
  const [logoFoto, setLogoFoto] = useState();
  const {
    navBarBack,
    ChangeTheme,
    toggle,
    modalIcon,
    theme,
    navBarBackDrop,
    btnDarkMode,
  } = useContext(ThemeContext);
  useEffect(() => {
    setLogoFoto(() => (toggle ? logoMini : logoMiniDark));
  }, [toggle]);

  const [cnpj, setCnpj] = useState();
  const { token, id } = useContext(AuthContext);
  const navigate = useNavigate();

  function getUserData() {
    api
      .get(`/pessoa/${id}`, { headers: { Authorization: token } })
      .then((res) => {
        setCnpj(res.data.cnpj);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleEditPerfilClick() {
    cnpj
      ? navigate("/editarperfilpessoajuridica")
      : navigate("/editarperfilpessoafisica");
  }

  useEffect(() => {
    if (token && id) {
      getUserData();
    }
  }, [token, id]);

  return (
    <>
      <style type="text/css">
        {`
    .dropdown-toggle::after {
      display: none !important; 
    }
    `}
      </style>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          bg="light"
          expand={expand}
          style={{ paddingTop: "0%", paddingBottom: "0%", width: "100%" }}
        >
          <Container fluid style={navBarBack}>
            <Navbar.Brand href="#">
              <a
                className="formato-mini-logo"
                onClick={() => navigate("/home")}
              >
                <img
                  style={{
                    width: "3.5rem",

                    position: "relative",
                    left: "4vw",
                  }}
                  src={logoFoto}
                />
              </a>
            </Navbar.Brand>
            <NavDropdown
                

              // drop={'start'}
              style={navBarBackDrop}
              title={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={"2rem"}
                  fill="currentColor"
                  class="bi bi-list"
                  viewBox="0 0 16 16"
                  link="disabled"
                >
                  <path
                    style={modalIcon}
                    fill-rule="evenodd"
                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                  />
                </svg>
              }
            >
              <NavDropdown.Item onClick={handleEditPerfilClick}>
                Editar Perfil
              </NavDropdown.Item>
              <NavDropdown.Item>
                {/* <span> */}
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <div style={{ width: "80%" }}>
                    <label>Dark Mode</label>
                  </div>
                  <div style={{ width: "20%" }}>
                    <Button onClick={() => ChangeTheme()} style={btnDarkMode} />
                  </div>
                </div>
                {/* <Toggle
                  id="cheese-status"
                  defaultChecked={!toggle}
                  onChange={ChangeTheme}
                /> */}
                {/* </span> */}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleShowModal3}>
                Sair
              </NavDropdown.Item>
            </NavDropdown>
            <Modal
              className="p-5 d-flex justify-content-center align-items-center"
              show={showModal3}
              onHide={handleCloseModal3}
            >
              <Modal.Title className="p-4 d-flex justify-content-center align-items-center">
                Tem certeza que deseja sair?
              </Modal.Title>

              <Modal.Body className="p-3 d-flex justify-content-center align-items-center">
                <Form>
                  <Form.Group controlId="exampleForm.ControlInput1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="120"
                      height="120"
                      style={{
                        display: "flex",
                        position: "relative",
                        bottom: "2vh",
                        left: "1vw",
                      }}
                      fill="currentColor"
                      class="bi bi-box-arrow-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
                      />
                    </svg>
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer className="d-flex justify-content-center align-items-center">
                <Button
                  className="d-flex justify-content-center align-items-center"
                  variant="primary"
                  onClick={() => {
                    localStorage.removeItem("Authorization");
                    navigate("/login");
                  }}
                  style={{
                    position: "relative",
                    fontWeight: "bold",
                    width: "8rem",
                    borderRadius: "10.35px",
                    color: "#51B5C5",
                    backgroundColor: "#ffffff",
                    borderColor: "#51B5C5",
                  }}
                >
                  SIM
                </Button>
                <Button
                  className="d-flex justify-content-center align-items-center"
                  variant="primary"
                  onClick={
                    //enviardados()
                    handleCloseModal3
                  }
                  style={{
                    position: "relative",
                    fontWeight: "bold",
                    width: "8rem",
                    borderRadius: "10.35px",
                    color: "#ffffff",
                    backgroundColor: "#51B5C5",
                    border: "#51B5C5",
                  }}
                >
                  NÃO
                </Button>
              </Modal.Footer>
            </Modal>
          </Container>
        </Navbar>
      ))}
    </>
  );
}
