import styled from "styled-components";

export const Container = styled.div`

  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;

  @media only screen and (max-width: 700px) {
    grid-template-columns: 1fr ;
    /* margin-bottom: 16px; */
  }

`;

export const BtnAddImag = styled.div`

  width: 100%;
  display: flex;
  grid-template-columns: 1fr 1fr;
  padding: 0;

  @media only screen and (max-width: 700px) {
    margin-bottom: 16px;
  }

`;


