import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { darkFaded } from 'style';
import 'normalize.css';
// import Home from 'pages/home';

const GlobalStyles = createGlobalStyle`
  html {
    font-family: "Open Sans", sans-serif;
    height: 100%;
  }

  body {
    height: 100%;
    overflow: hidden;
    background-color: ${darkFaded};
  }

  #__next {
    height: 100%;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <p>asdfasdf</p>
  </>
);

export default App;
