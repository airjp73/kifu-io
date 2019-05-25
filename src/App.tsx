import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { highlightFaded, darkFaded } from 'style';
import Home from 'pages/Home';
import Login from 'pages/Login';
import View from 'pages/View';
import AppContext from './AppContext';
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

  h1{ 
    color: ${highlightFaded};
    text-align: center;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <AppContext>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/view" component={View} />
    </AppContext>
  </>
);

export default App;
