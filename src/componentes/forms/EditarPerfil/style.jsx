import styled from "styled-components";

export const Container = styled.div`

  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 0;

  @media only screen and (max-width: 700px) {
    padding-left: 2rem;
    padding-right: 2rem;
    grid-template-columns: 1fr ;
  }

`;


