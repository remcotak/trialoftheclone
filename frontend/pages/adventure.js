import AdventureDetail from '../components/AdventureDetail';
import AuthUser from '../components/AuthUser';

const Adventure = ({ query }) => (
  <AuthUser>
    <h1>Adventure time! 🏞</h1>
    <AdventureDetail id={query.id} />
  </AuthUser>
);

export default Adventure;
