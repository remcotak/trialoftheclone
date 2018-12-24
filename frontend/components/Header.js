import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.nav`
  display: flex;
  justify-content: center;
  border-bottom: 2px solid ${props => props.theme.black};
  margin: 0 auto;

  a {
    font-family: ${props => props.theme.fontHeading};
    padding: 1rem;

    &:hover {
      color: ${props => props.theme.primary};
    }
  }
`;

const Header = () => (
  <StyledHeader>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/adventures">
      <a>Adventures</a>
    </Link>
    <Link href="/stats">
      <a>Stats</a>
    </Link>
    <Link href="/inventory">
      <a>Inventory</a>
    </Link>
    <Link href="/aspects">
      <a>Aspects</a>
    </Link>
  </StyledHeader>
);

export default Header;
