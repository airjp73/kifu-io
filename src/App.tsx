import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { darkFaded } from 'style';
import Home from 'pages/Home';
import Login from 'pages/Login';
import View from 'pages/View';
import 'normalize.css';

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

  #root {
    height: 100%;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/view" component={View} />
    </BrowserRouter>
  </>
);

export default App;
