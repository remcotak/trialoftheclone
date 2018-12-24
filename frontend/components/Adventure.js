import React, { Component } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import formatDate from '../lib/formatDate';

const AdventureStyles = styled.div`
  box-shadow: ${props => props.theme.bs};
  border-top: 4px solid ${props => props.theme.secondary};

  .adventure__container {
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

  .adventure__button-list {
    display: flex;
    width: 100%;
    border-top: 2px solid ${props => props.theme.black};

    & > * {
      font-family: ${props => props.theme.fontHeading};
      padding: 15px;
      flex-grow: 1;
      text-align: center;
      border-left: 1px solid ${props => props.theme.black};
      border-right: 1px solid ${props => props.theme.black};
      /* border-bottom: 2px solid transparent; */

      &:hover,
      &:focus {
        background-color: ${props => props.theme.primary};
        /* border-bottom: 2px solid ${props => props.theme.primary}; */
      }
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
    const { id, title, isAlive, createdAt, updatedAt } = this.props.adventure;

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
          <div>
            <div>Created at: {formatDate(createdAt)}</div>
            <div>Last played: {formatDate(updatedAt)}</div>
          </div>
        </div>
        <div className="adventure__button-list">
          {isAlive && (
            <Link
              href={{
                pathname: '/adventure',
                query: { id: id }
              }}
            >
              <a>Start! 🎮</a>
            </Link>
          )}
          <Link
            href={{
              pathname: '/adventure',
              query: { id: id }
            }}
          >
            <a>Delete! 🗑</a>
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
