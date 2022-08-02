import styled from "styled-components";

export const ContainerEstrutura = styled.div`
  height: 100%;
  min-height: 100vh;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BotoesTopoCadastrar = styled.div`
  margin-top: 2rem;
  width: 50%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 0;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const FormularioEditEvento = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;

export const FormularioEditNoticia = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;
export const FormularioEditOportunidade = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 50vw;
`;
export const ProfileModal = styled.div``;

export const BotaoCascataProfile = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  margin-right: 0.45vw;
`;

export const Evento = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items:center;
`;
export const Noticia = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
`;
export const Oportunidade = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TopoPag = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
`;
