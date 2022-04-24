import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  body {
    background-color: ${({ theme }) => theme.clr.background};
  }
`;

export default GlobalStyle;
