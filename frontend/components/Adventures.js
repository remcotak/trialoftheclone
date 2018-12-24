import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Adventure from '../components/Adventure';
import gql from 'graphql-tag';
import styled from 'styled-components';

const ALL_ADVENTURES_QUERY = gql`
  query ALL_ADVENTURES_QUERY {
    adventures {
      id
      title
      isAlive
      createdAt
      updatedAt
    }
  }
`;

const AdventuresStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.spacingLarge};
  max-width: ${props => props.theme.maxWidth};

  @media screen and (min-width: 680px) {
    grid-template-columns: 1fr 1fr;
  }
`;

class Adventures extends Component {
  render() {
    return (
      <Query query={ALL_ADVENTURES_QUERY}>
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;

          return (
            <AdventuresStyles>
              {data.adventures.map(adventure => (
                <Adventure adventure={adventure} key={adventure.id} />
              ))}
            </AdventuresStyles>
          );
        }}
      </Query>
    );
  }
}

export default Adventures;
