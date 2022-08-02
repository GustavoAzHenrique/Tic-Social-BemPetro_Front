import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import styled from "styled-components";

export const Container = styled.div`

  width: 100%;
  height: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

export const Foto = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
  width: 90%;
  align-items: center;
`;

export const Formulario = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Formulario2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  margin-top: 12%;
`;

export const BotoesTopo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;
  margin-top: 15%;
`;

export const BotoesBaixo2 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-bottom: 10px;

  margin-top: 2%;
`;

export const BotoesBaixo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 0.3%;
`;
export const BotaoSelecionado = styled.button`
  color: "#FFFFFF";
  background-color: "black";
`;
export const BotaoNaoSelecionado = styled.button`
  color: "#FFFFFF";
  background-color: "#FFFFFF";
`;

export const BotaoCascata = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-right: 15.45rem;
`;

export const BotaoCascata2 = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.45vw;
`;

export const Estilo = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-top: 1rem;
  margin-right: 15.45rem;

  @media (max-width: 1619px) {
    width: 200vw;
  }

  @media (max-width: 1319px) {
    flex-direction: column;
    position: relative;
  }
`;

export const Pessoa = styled.div`
`;

export const Empresa = styled.div`
`;

export const TesteModal = styled.div``;
