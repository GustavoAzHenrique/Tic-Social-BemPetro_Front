import React from "react";
import logo from "../../img/bemPetroLogo.png";

export const LogoIconeEditar = () => {
  return (
    <>
      <a
        className="imagemVoltar"
        style={{
          color: "#51B5C5",
          alignItems: "center",
          position: "relative",
          top: "7vw",
          right: "23%",
          width: "35px",
          height: "35px",
          justifyContent: "flex-end",
          flexWrap: "wrap",
        }}
        href="/login"
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
      <img
        style={{
          position: "absolute",
          width: "40%",
          alignItems: "center",
          justifyContent: "center",

          paddingLeft: "10%",
          paddingTop: "17%",
        }}
        src={logo}
      />
    </>
  );
};
