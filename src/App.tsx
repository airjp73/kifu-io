import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { highlightFaded, darkFaded } from 'style';
import Login from 'pages/Login';
import View from 'pages/View';
import Profile from 'pages/Profile';
import AuthRoute from 'components/AuthRoute';
import Layout from 'components/Layout';
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
      <Layout>
        <Route exact path="/" render={() => <Redirect to="/view/sample" />} />
        <Route path="/login" component={Login} />
        <Route path="/view/:gameId" component={View} />
        <AuthRoute path="/profile" component={Profile} />
      </Layout>
    </AppContext>
  </>
);

export default App;
