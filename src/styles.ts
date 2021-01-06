import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: "Heebo";
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    background: white;
  }

  .block-ui-overlay {
    opacity: .7;
    min-height: 100vh;
    position: fixed;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #f6f6f6;       
  }

  ::-webkit-scrollbar-thumb {
    background-color: #265fb1d4;  
    border-radius: 20px;      
  }
`

export default GlobalStyle;