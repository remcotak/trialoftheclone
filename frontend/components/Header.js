import React, { Fragment } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import styled from 'styled-components';
import User from './User';
import SignOut from './SignOut';
import MenuLink from './styles/MenuItem';

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
`;

const Header = () => (
  <User>
    {({ data: { me } }) => (
      <StyledHeader>
        <Link href="/" passHref>
          <MenuLink>Home</MenuLink>
        </Link>
        {me && (
          <Fragment>
            <Link href="/adventures" passHref>
              <MenuLink>Adventures</MenuLink>
            </Link>
            <SignOut>Sign out</SignOut>
          </Fragment>
        )}
        {!me && (
          <Link href="/sign-in" passHref>
            <MenuLink>Sign in</MenuLink>
          </Link>
        )}
      </StyledHeader>
    )}
  </User>
);

export default Header;
export { SIGNOUT_USER_MUTATION };
