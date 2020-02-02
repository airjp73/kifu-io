import React from 'react';
import { Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import { teal, purple } from 'style';
import Login from 'pages/Login';
import View from 'pages/View';
import Profile from 'pages/Profile';
import Upload from 'pages/Upload';
import AuthRoute from 'components/AuthRoute';
import Layout from 'components/Layout';
import 'normalize.css';
import AppContext from './AppContext';
import Home from 'pages/Home';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = createGlobalStyle`
  html {
    font-family: "Open Sans", sans-serif;
    height: 100%;
  }

  body {
    height: 100%;
    overflow: hidden;
    background-color: ${purple[50]};
  }

  #root {
    height: 100%;
  }

  h1 { 
    color: ${teal[0]};
    text-align: center;
  }

  svg {
    display:flex;
  }
`;

const App = () => (
  <>
    <GlobalStyles />
    <ToastContainer />
    <AppContext>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/view/:gameId" component={View} />
        <AuthRoute path="/profile" component={Profile} />
        <Route path="/upload" component={Upload} />
      </Layout>
    </AppContext>
  </>
);

export default App;
