import React, { Component, Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import AdventureListItem from './AdventureListItem';
import AdventureSearch from './AdventureSearch';
import Pagination from './Pagination';
import styled from 'styled-components';
import { perPage } from '../config';

const ALL_ADVENTURES_QUERY = gql`
  query ALL_ADVENTURES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    adventures(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      title
      act
      page
      isAlive
      createdAt
      updatedAt
    }
  }
`;

const AdventuresListStyles = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${props => props.theme.spacingLarge};
  max-width: ${props => props.theme.maxWidth};

  @media screen and (min-width: ${props => props.theme.lap}) {
    grid-template-columns: 1fr 1fr;
  }
`;

class AdventuresList extends Component {
  render() {
    return (
      <Query
        query={ALL_ADVENTURES_QUERY}
        variables={{
          skip: this.props.page * perPage - perPage
        }}
      >
        {({ data, error, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          if (data.adventures.length === 0)
            return <p>No adventure started yet 🤷‍♂️</p>;

          return (
            <Fragment>
              <AdventureSearch />
              <Pagination page={this.props.page} />
              <AdventuresListStyles>
                {data.adventures.map(adventure => (
                  <AdventureListItem adventure={adventure} key={adventure.id} />
                ))}
              </AdventuresListStyles>
              <Pagination page={this.props.page} />
            </Fragment>
          );
        }}
      </Query>
    );
  }
}

export default AdventuresList;
export { ALL_ADVENTURES_QUERY };
