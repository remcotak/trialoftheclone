import Link from 'next/link';
import AdventuresList from '../components/Adventures';
import styled from 'styled-components';

const AdventuresStyles = styled.div`
  .adventures__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .adventures__new {
    position: relative;
    background: none;
    border: 2px solid ${props => props.theme.black};
    padding: ${props => props.theme.spacingSmall}
      ${props => props.theme.spacingBase};
    font-size: 1rem;
    font-weight: bold;
    font-family: ${props => props.theme.fontHeading};
    color: ${props => props.theme.black};

    &::after {
      content: '';
      position: absolute;
      display: block;
      top: 0;
      right: 100%;
      bottom: 0;
      left: 0;
      background-color: ${props => props.theme.primary};
      z-index: -1;
      transition: all 0.1s ease-in;
    }

    &:hover,
    &:focus {
      &::after {
        right: 0;
      }
    }
  }
`;

const Adventures = () => (
  <AdventuresStyles>
    <div className="adventures__header">
      <h1>Your adventures 🎒</h1>
      <Link href="/adventure">
        <a className="adventures__new">Start new adventure 👊</a>
      </Link>
    </div>
    <AdventuresList />
  </AdventuresStyles>
);

export default Adventures;
