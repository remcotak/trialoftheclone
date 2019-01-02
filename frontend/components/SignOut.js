import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import { CURRENT_USER_QUERY } from './User';
import { MenuButton } from './styles/MenuItem';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signOut {
      message
    }
  }
`;

const signOut = props => (
  <Mutation
    mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signOut => (
      <MenuButton
        onClick={async () => {
          await signOut();
          // Redirect to single page with given id
          Router.push('/');
        }}
      >
        {props.children}
      </MenuButton>
    )}
  </Mutation>
);
export default signOut;
