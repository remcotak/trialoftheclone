import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { ALL_ADVENTURES_QUERY } from './AdventuresList';
import formatDate from '../lib/formatDate';
import Button, { ButtonAnchor } from './styles/Button';

const DELETE_ADVENTURE_MUTATION = gql`
  mutation DELETE_ADVENTURE_MUTATION($id: ID!) {
    deleteAdventure(id: $id) {
      id
    }
  }
`;

const AdventureListItemStyles = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.bs};
  border-top: 4px solid;
  border-color: ${props =>
    props.isAlive ? `${props.theme.secondary}` : `${props.theme.gray}`};

  .adventure__container {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: ${props => props.theme.spacingBase};
  }

  .adventure__header {
    margin-bottom: ${props => props.theme.spacingBase};
  }

  .adventure__title {
    display: inline-block;
    margin: 0;
    margin-bottom: ${props => props.theme.spacingSmall};
    color: ${props => props.theme.black};

    &::after {
      content: '';
      display: block;
      border-bottom: 2px solid ${props => props.theme.primary};
    }
  }

  .adventure__subtitle {
    font-style: italic;
    color: ${props => props.theme.gray};
  }

  .adventure__description {
    margin-top: auto;
  }

  .adventure__meta {
    font-weight: bold;
    margin-bottom: ${props => props.theme.spacingSmall};
  }

  .adventure__button-list {
    display: flex;
    width: 100%;
    border-top: 2px solid ${props => props.theme.black};

    & > * {
      flex-grow: 1;
      text-align: center;
      border: 0;
      border-left: 1px solid ${props => props.theme.black};
      border-right: 1px solid ${props => props.theme.black};
    }

    & > *:first-child {
      border-left: 0;
    }

    & > *:last-child {
      border-right: 0;
    }
  }
`;

class AdventureListItem extends Component {
  // Manually update the cache on the client,
  // matching the server
  update = (cache, payload) => {
    // Read the cache
    const data = cache.readQuery({ query: ALL_ADVENTURES_QUERY });
    // Filter items that are still in the data
    data.adventures = data.adventures.filter(
      adventure => adventure.id !== payload.data.deleteAdventure.id
    );
    // Put the items back
    cache.writeQuery({ query: ALL_ADVENTURES_QUERY, data });
  };

  render() {
    const {
      id,
      title,
      isAlive,
      act,
      page,
      createdAt,
      updatedAt
    } = this.props.adventure;

    return (
      <AdventureListItemStyles isAlive={isAlive}>
        <div className="adventure__container">
          <div className="adventure__header">
            <Link
              href={{
                pathname: '/adventure',
                query: { id: id }
              }}
            >
              <a>
                <h2 className="adventure__title">{title}</h2>
              </a>
            </Link>
            <div className="adventure__subtitle">
              This adventure is{' '}
              {`${isAlive ? 'still going strong 💪' : 'over ☠️'} `}
            </div>
          </div>
          <div className="adventure__description">
            <div className="adventure__meta">
              Act: {act}, Page: {page}
            </div>
            <div>Last played: {formatDate(updatedAt)}</div>
            <div>Created at: {formatDate(createdAt)}</div>
          </div>
        </div>
        <div className="adventure__button-list">
          {isAlive ? (
            <Link
              href={{
                pathname: '/adventure',
                query: { id: id }
              }}
            >
              <ButtonAnchor>Start! 🎮</ButtonAnchor>
            </Link>
          ) : (
            <Link
              href={{
                pathname: '/adventure',
                query: { id: id }
              }}
            >
              <ButtonAnchor>View 👀</ButtonAnchor>
            </Link>
          )}
          <Mutation
            mutation={DELETE_ADVENTURE_MUTATION}
            variables={{ id: id }}
            update={this.update}
          >
            {(deleteAdventure, { error, loading }) => {
              return (
                <Button
                  onClick={() => {
                    if (
                      confirm('Are you sure you want to delete this adventure?')
                    ) {
                      deleteAdventure().catch(err => alert(err.message));
                    }
                  }}
                  disabled={loading}
                >
                  Delet{loading ? 'ing' : 'e'} 🗑
                </Button>
              );
            }}
          </Mutation>
        </div>
      </AdventureListItemStyles>
    );
  }
}

AdventureListItem.propTypes = {
  adventure: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isAlive: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default AdventureListItem;
export { DELETE_ADVENTURE_MUTATION };
