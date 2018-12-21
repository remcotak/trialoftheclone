import React, { Component } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import Header from './Header';
import Meta from './Meta';

const theme = {
  primary: '#E0335E',
  secondary: '#FF8100',
  black: '#393939',
  white: '#fff',
  maxWidth: '1000px',
  fontRegular: `'Alegreya-Regular', 'Arial', 'sans-serif'`,
  fontHeading: `'FjallaOne-Regular', 'Arial', 'sans-serif'`,
  bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)'
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
    text-decoration: none;
    color: ${theme.black};
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
        <React.Fragment>
          <GlobalStyle />
          <Meta />
          <Header />
          <InnerPage>{this.props.children}</InnerPage>
        </React.Fragment>
      </ThemeProvider>
    );
  }
}

export default Page;
