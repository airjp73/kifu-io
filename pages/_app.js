import App, { Container } from 'next/app'

// Extending app primarily to get in this
import 'normalize.css';

class GoReviewsApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default GoReviewsApp;