import AdventureDetail from '../components/AdventureDetail';

const Adventure = ({ query }) => (
  <div>
    <h1>Adventure time! 🏞</h1>
    <AdventureDetail id={query.id} />
  </div>
);

export default Adventure;
