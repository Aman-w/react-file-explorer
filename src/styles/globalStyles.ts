import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: #1e1e1e;
    color: white;
    font-family: 'Arial', sans-serif;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyles;
