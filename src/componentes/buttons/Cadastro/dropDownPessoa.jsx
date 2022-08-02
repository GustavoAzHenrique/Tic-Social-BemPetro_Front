import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const DropDownPessoa = () => {
  return (
    <>
      <Dropdown
                style={{
                  width: "20%",
                }}
              >
                <Dropdown.Toggle
                  style={{
                    width: "19.5vw",
                    position: "relative",
                    right: "12.8vw",
                    bottom: "6vw",
                    fontSize: "1.2vw",
                    fontWeight: "bold",
                  }}
                  variant="light"
                  bg="light"
                  expand="lg"
                >
                  Perfil
                </Dropdown.Toggle>

                <Dropdown.Menu
                  variant="white"
                  bg="white"
                  expand="lg"
                  style={{
                    position: "absolute",
                    width: "40%",
                  }}
                >
                  <Dropdown.Item href="#/action-2">Editor</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Revisor</Dropdown.Item>
                
                </Dropdown.Menu>
              </Dropdown>
    </>
  );
};
