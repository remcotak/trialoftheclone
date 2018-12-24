import UpdateAdventure from '../components/UpdateAdventure';

const Adventure = ({ query }) => (
  <div>
    <h1>Adventure time! 🏞</h1>
    <UpdateAdventure id={query.id} />
  </div>
);

export default Adventure;
