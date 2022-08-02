import React, { useContext, useEffect, useState } from "react";
import {
  ContainerRevisor,
  TopRevisor,
  DivCardRevisor,
  DivGeralCard,
} from "./style";
import BemPetroNavbar from "../../componentes/bempetroNavbar";
import ParteSuperiorHomeRevisor from "../../componentes/buttons/HomRevisor/parteSuperiorHomeRevisor";
import { CardHomeRevisorEvento } from "../../componentes/card/cardHomeRevisorEvento";
import { CardHomeRevisorNoticia } from "../../componentes/card/cardHomeRevisorNoticia";
import { CardHomeRevisorOportunidade } from "../../componentes/card/cardHomeRevisorOportunidade";
import { AuthContext } from "../../context/AuthContext/index.jsx";
import api from "../../service/api.js";
import CardGroup from "react-bootstrap/CardGroup";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
import Button from "react-bootstrap/Button";

export const HomeRevisor = () => {
  const { token } = useContext(AuthContext);
  const { theme, ChangeTheme } = useContext(ThemeContext);
  const [noticias, setNoticias] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [oportunidades, setOportunidades] = useState([]);

  useEffect(() => {
    ReceberNoticias();
    ReceberEventos();
    ReceberOportunidade();
  }, []);

  function ReceberNoticias() {
    // console.log("dados" + noticias);
    api
      .get("/noticia/especifico", { headers: { Authorization: token } })
      .then((result) => {
        // console.log("dados das noticia" + JSON.stringify(result.data));
        setNoticias(result.data);
        // SetDropDown();
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  function ReceberEventos() {
    // console.log("dados" + noticias);
    api
      .get("/evento/especifico", { headers: { Authorization: token } })
      .then((result) => {
        // console.log("dados das eventos" + JSON.stringify(result.data));
        setEventos(result.data);
        // SetDropDown();
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  function ReceberOportunidade() {
    console.log("dados" + noticias);
    api
      .get("/oportunidade/especifico", { headers: { Authorization: token } })
      .then((result) => {
        console.log(
          "dados das oportunidades" + JSON.stringify(result.data)
        );
        setOportunidades(result.data);
        // SetDropDown();
      })
      .catch((error) => {
        console.log("Erro ao carregar " + JSON.stringify(error));

        if(error.response.status == 401) {
          localStorage.removeItem("Authorization");
          navigate("/login");
        }
      });
  }

  return (
    <>
      <ContainerRevisor style={theme}>
        <BemPetroNavbar />
        <TopRevisor>
          <ParteSuperiorHomeRevisor />
        </TopRevisor>

        {}

        <h2>noticias</h2>
        <CardGroup
          className="justify-content-center m-5"
          style={{ gap: "2rem" }}
        >
          {noticias.map((size) => (
            <CardHomeRevisorNoticia noticia={size} />
          ))}
        </CardGroup>
        <h2>eventos</h2>
        <CardGroup
          className="justify-content-center m-5"
          style={{ gap: "2rem" }}
        >
          {eventos.map((size) => (
            <CardHomeRevisorEvento publicacao={size} />
          ))}
        </CardGroup>
        <h2>oportunidades</h2>
        <CardGroup
          className="justify-content-center m-5"
          style={{ gap: "2rem" }}
        >
          {oportunidades.map((size) => (
            <CardHomeRevisorOportunidade publicacao={size}/>
          ))}
        </CardGroup>
      </ContainerRevisor>
    </>
  );
};
