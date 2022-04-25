import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
    font-family: 'Roboto';
    src: url('Roboto-Bold.ttf') format('truetype');
    font-weight: bold;
    font-style: normal;
}

@font-face {
    font-family: 'Roboto';
    src: url('Roboto-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
}

@font-face {
    font-family: 'Roboto';
    src: url('Roboto-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}

@font-face {
    font-family: 'Roboto';
    src: url('Roboto-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
}

@font-face {
    font-family: 'Roboto';
    src: url('Roboto-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
}

@font-face {
    font-family: 'Roboto';
    src: url('Roboto-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: "Roboto", Lato, "Lucida Grande", Tahoma, Sans-Serif;
  }

  body {
    background-color: ${({ theme }) => theme.clr.background};
  }
`;

export default GlobalStyle;
