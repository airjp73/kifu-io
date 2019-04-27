import App, { Container } from 'next/app';
import { createGlobalStyle } from 'styled-components';
import { darkFaded } from 'style';
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

  #__next {
    height: 100%;
  }
`;

class GoReviewsApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <GlobalStyles />
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default GoReviewsApp;
