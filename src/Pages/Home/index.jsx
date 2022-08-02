import React, { useContext, useEffect } from "react";
import { ContainerHome, TopHome, DivCard, GeralDivCard } from "./style.jsx";
import BemPetroNavbar from "../../componentes/bempetroNavbar";
import Button from "react-bootstrap/Button";
import Text from "react-bootstrap/Button";
import ParteSuperiorHome from "../../componentes/buttons/Hom/parteSuperiorHome.jsx";
import { CardHome } from "../../componentes/card/cardHome.jsx";
import { AuthContext } from "../../context/AuthContext/index.jsx";
import { ThemeContext } from "../../context/ThemeMode/style.jsx";
import CardGroup from "react-bootstrap/CardGroup";
import api from "../../service/api.js";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CardHomeEvento } from "../../componentes/card/cardHomeEvento.jsx";
import { CardHomeOportunidade } from "../../componentes/card/cardHomeOportunidades.jsx";
import { CardHomeRevisorEvento } from "../../componentes/card/cardHomeRevisorEvento";
import { CardHomeRevisorNoticia } from "../../componentes/card/cardHomeRevisorNoticia";
import { CardHomeRevisorOportunidade } from "../../componentes/card/cardHomeRevisorOportunidade";
import ParteSuperiorHomeRevisor from "../../componentes/buttons/HomRevisor/parteSuperiorHomeRevisor";
import { ReRenderContext } from "../../context/ReRender/Rerender.jsx";

export const Home = () => {
  const { token, roles } = useContext(AuthContext);
  const { theme, ChangeTheme } = useContext(ThemeContext);
  const [noticias, setNoticias] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [oportunidades, setOportunidades] = useState([]);
  const [section, setSection] = useState(0);
  const {id} = useParams()
  const { renderCount } = useContext(ReRenderContext);

  const [noticiasPen, setNoticiasPen] = useState([]);
  const [eventosPen, setEventosPen] = useState([]);
  const [oportunidadesPen, setOportunidadesPen] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if(token && roles) {
    ReceberNoticias();
    ReceberEventos();
    ReceberOportunidade();
    ChangePerfil();

    getNoticiasPendentes();
    getEventosPendentes();
    getOportunidadesPendentes()
    }
  }, [token, roles, renderCount]);


  function ChangePerfil() {
    roles.map((role) => {
      if (role === "editor") {
        setSection(0);
      } else {
        setSection(1);
      }
    });
  }
  function ReceberNoticias() {
    api
      .get("/noticia/especifico", { headers: { Authorization: token } })
      .then((result) => {
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
    api
      .get("/evento/especifico", { headers: { Authorization: token } })
      .then((result) => {
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
    api
      .get('/oportunidade/especifico/', { headers: { Authorization: token } })
      .then((result) => {
        // console.log("dados das oportunidades" + JSON.stringify(result.data));
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

  function getNoticiasPendentes() {
    api.get('/noticia/pendentes', { headers: { Authorization: token } }).then(res => {
      setNoticiasPen(res.data);
    }).catch(error => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    })
  }

  function getEventosPendentes() {
    api.get('/evento/pendentes', { headers: { Authorization: token } }).then(res => {
      setEventosPen(res.data);
    }).catch(error => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    })
  }

  function getOportunidadesPendentes() {
    api.get('/oportunidade/pendentes', { headers: { Authorization: token } }).then(res => {
      setOportunidadesPen(res.data);
    }).catch(error => {
      console.log(error);

      if(error.response.status == 401) {
        localStorage.removeItem("Authorization");
        navigate("/login");
      }
    })
  }

  return (
    <>
      {section === 0 && (
        <ContainerHome style={theme}>
          <BemPetroNavbar />
          <TopHome>
            <ParteSuperiorHome />
          </TopHome>

          {noticias.length !== 0 && <h2>notícias</h2>}
          <CardGroup
            className="justify-content-center m-5"
            style={{ gap: "2rem" }}
          >

            {noticias?.map((size) => (
              <CardHome pulicacao={size} id={size.id} />
            ))}
          </CardGroup>
          {eventos.length !== 0 && <h2>eventos</h2>}
          <CardGroup
            className="justify-content-center m-5"
            style={{ gap: "2rem" }}
          >
          
            {eventos?.map((size) => (
              <CardHomeEvento pulicacao={size} id={size.id} />
            ))}
          </CardGroup>
          {oportunidades.length !== 0 && <h2>oportunidades</h2>}
          <CardGroup
            className="justify-content-center m-5"
            style={{ gap: "2rem" }}
          >
          
            {oportunidades?.map((size) => (
              <CardHomeOportunidade pulicacao={size} id={size.id} />
            ))}
          </CardGroup>
        </ContainerHome>
      )}
      {section === 1 && (
        <ContainerHome style={theme}>
          <BemPetroNavbar />
          <TopHome>
            <ParteSuperiorHomeRevisor />
          </TopHome>
          {noticiasPen.length !== 0 && <h2>noticias</h2>}
          <CardGroup
            className="justify-content-center m-5"
            style={{ gap: "2rem" }}
          >
            {noticiasPen?.map((size) => (
              <CardHomeRevisorNoticia noticia={size} />
            ))}
          </CardGroup>
          {eventosPen.length !== 0 && <h2>eventos</h2>}
          <CardGroup
            className="justify-content-center m-5"
            style={{ gap: "2rem" }}
          >
            {eventosPen?.map((size) => (
              <CardHomeRevisorEvento publicacao={size} />
            ))}
          </CardGroup>
          {oportunidadesPen.length !== 0 && <h2>oportunidades</h2>}
          <CardGroup
            className="justify-content-center m-5"
            style={{ gap: "2rem" }}
          >
            {oportunidadesPen?.map((size) => (
              <CardHomeRevisorOportunidade publicacao={size} />
            ))}
          </CardGroup>
        </ContainerHome>
      )}
    </>
  );
};
