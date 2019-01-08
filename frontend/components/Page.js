import React, { Component, Fragment } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  primary: '#ffd800',
  secondary: '#4064FF',
  black: '#393939',
  gray: '#9e9e9e',
  white: '#fff',
  maxWidth: '1000px',
  fontRegular: `'Alegreya-Regular', 'Arial', 'sans-serif'`,
  fontHeading: `'FjallaOne-Regular', 'Arial', 'sans-serif'`,
  bs: '0 5px 15px 0 rgba(0, 0, 0, 0.09)',
  spacingLarge: '40px',
  spacingBase: '20px',
  spacingSmall: '10px',
  spacingTiny: '5px'
};

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'FjallaOne-Regular';
    src: url('/static/FjallaOne-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Alegreya-Regular';
    src: url('/static/Alegreya-Regular.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Alegreya-Regular';
    src: url('/static/Alegreya-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'Alegreya-Regular';
    src: url('/static/Alegreya-Italic.woff2') format('woff2');
    font-weight: normal;
    font-style: italic;
    font-display: swap;
  }
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    line-height: 1.2;
    font-family: 'Alegreya-Regular';
    color: ${theme.black};
    background-color: ${theme.white};
  }
  h1, h2, h3, h4, h5, h6 {
    font-family: 'FjallaOne-Regular';
  }
  a {
    text-decoration: underline;
    color: ${theme.secondary};
  }
`;

const InnerPage = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Meta />
          <Header />
          <InnerPage>{this.props.children}</InnerPage>
        </Fragment>
      </ThemeProvider>
    );
  }
}

export default Page;
