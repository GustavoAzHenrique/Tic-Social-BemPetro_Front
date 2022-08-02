import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const DropDownEditPerfil = () => {
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
            top: "23vh",
            fontSize: "1.2vw",
            fontWeight: "bold",
          }}
          variant="light"
          bg="light"
          expand="lg"
        >
          Atividade Econômica*
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
          <Dropdown.Item href="#/action-2">Atividade 1</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Atividade 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
