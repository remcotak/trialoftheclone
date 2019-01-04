import CreateAdventure from '../components/CreateAdventure';
import AuthUser from '../components/AuthUser';

const Adventure = () => (
  <AuthUser>
    <h1>A new adventure awaits 🌈</h1>
    <CreateAdventure />
  </AuthUser>
);

export default Adventure;
