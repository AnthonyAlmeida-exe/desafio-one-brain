import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root{
    --background: #fff;
    --red: #ea1d2c;
    --grafite: #717171;
  }
 
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    background:  var(--background);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {

    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  } 
  h1, h2,h3,h4, h5,h6, strong {
    font-weight: 600;
  }

  html {
    @media(max-width: 1080px){
      font-size: 93.75%;
    }
    @media(max-width: 720px){
      font-size: 87.5%;
    }
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity:  0.6;
    cursor: not-allowed;
  }

`;
