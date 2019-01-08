import Link from 'next/link';
import styled from 'styled-components';
import AdventuresList from '../components/AdventuresList';
import AuthUser from '../components/AuthUser';
import { ButtonAnchor } from '../components/styles/Button';

const AdventuresStyles = styled.div`
  .adventures__header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

const Adventures = ({ query }) => (
  <AuthUser>
    <AdventuresStyles>
      <div className="adventures__header">
        <h1>Your adventures 🎒</h1>
        <Link href="/create-adventure" passHref>
          <ButtonAnchor>Start new adventure 👊</ButtonAnchor>
        </Link>
      </div>
      <AdventuresList page={parseFloat(query.page) || 1} />
    </AdventuresStyles>
  </AuthUser>
);

export default Adventures;
