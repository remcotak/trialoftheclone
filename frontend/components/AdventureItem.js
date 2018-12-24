import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatDate from '../lib/formatDate';
import { ButtonAnchor } from '../components/styles/Button';

const AdventureStyles = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.theme.bs};
  border-top: 4px solid ${props => props.theme.secondary};

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

class Adventure extends Component {
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
      <AdventureStyles>
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
          <Link
            href={{
              pathname: '/adventure',
              query: { id: id }
            }}
          >
            <ButtonAnchor>Delete 🗑</ButtonAnchor>
          </Link>
        </div>
      </AdventureStyles>
    );
  }
}

Adventure.propTypes = {
  adventure: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    isAlive: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired
  })
};

export default Adventure;
