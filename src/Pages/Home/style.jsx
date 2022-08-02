import styled from "styled-components";

export const ContainerHome = styled.div`
  height: 100%;
  min-height: 100vh;
  align-items: center;
  /* background-color: #EFEFEF; */
  display: flex;
  flex-direction: column;
`;

export const TopHome = styled.div`
  display: flex;
  flex-direction:row ;
  align-items: center;
  width: 100%;
  height: 10vh;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export const DivCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20%;
  width: 30%;
  height: 30vh;
`;

export const GeralDivCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 100%;
  gap: 15vw;
`;
