import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Link from 'next/link';
import styled from 'styled-components';
import { ButtonAnchor } from './styles/Button';
import { perPage } from '../config';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    adventuresConnection {
      aggregate {
        count
      }
    }
  }
`;

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;

  .pagination__count {
    margin: 0;
    padding: ${props => props.theme.spacingSmall}
      ${props => props.theme.spacingBase};
    border-top: 2px solid ${props => props.theme.black};
    border-bottom: 2px solid ${props => props.theme.black};
    &:last-child {
      border-right: 0;
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>;
      const count = data.adventuresConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Link
            prefetch
            href={{
              pathname: 'adventures',
              query: { page: page - 1 }
            }}
          >
            <ButtonAnchor
              className="prev"
              aria-disabled={page <= 1}
              animationReversed
            >
              👈 Prev
            </ButtonAnchor>
          </Link>
          <p className="pagination__count">
            Page {page} of {pages}!
          </p>
          <Link
            prefetch
            href={{
              pathname: 'adventures',
              query: { page: page + 1 }
            }}
          >
            <ButtonAnchor className="prev" aria-disabled={page >= pages}>
              Next 👉
            </ButtonAnchor>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;
