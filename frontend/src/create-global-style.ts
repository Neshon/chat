import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  html {
    --color-white: #ffffff;
    
    --color-gray-100: #e5e5e5;
    --color-gray-200: #C4C4C4;
    --color-gray-500: rgba(218, 218, 218, 0.53);
    --color-gray-500: #777777;

    --color-black-500: rgba(5, 5, 5, 0.88);
  }
  
  body {
    position: fixed;
    inset: 0;
    height: 100vh;
    background-color: var(--color-black-500);
    
    font-size: 16px;
    font-family: 'Poppins', sans-serif;

  }
  
  #root {
    display: flex;
    flex-flow: column;
    height: 100%;
  }
  
  button {
    padding: 0;
    border: 0;
    background: transparent;
  }
`
