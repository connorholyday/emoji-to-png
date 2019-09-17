import React from "react";
import App from "next/app";
import theme from "../components/theme";
import Header from "../components/header";
import Footer from "../components/footer";

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <Header />
        <Component {...pageProps} />
        <Footer />
        <style jsx global>{`
          *::before,
          *::after {
            box-sizing: inherit;
          }

          html,
          body {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI",
              Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue",
              sans-serif;
            font-display: swap;
            color: ${theme.colors.copy};
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        `}</style>
      </>
    );
  }
}

export default MyApp;
