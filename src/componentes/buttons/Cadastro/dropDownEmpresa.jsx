import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export const DropDownEmpresa = () => {
  return (
    <>
      <Dropdown
        style={{
          width: "33%",
          position: "absolute",
        }}
      >
        <Dropdown.Toggle
          style={{
            width: "75%",
            position: "relative",
            top: "4.5vh",
            fontSize: "1.2vw",
            fontWeight: "bold",
          }}
          variant="light"
          bg="light"
          expand="lg"
        >
          Atividade Economica*
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
          <Dropdown.Item href="#/action-2">Varejo</Dropdown.Item>
          <Dropdown.Item href="#/action-3">Eventos</Dropdown.Item>
          <Dropdown.Item href="#/action-4">Culinária</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
