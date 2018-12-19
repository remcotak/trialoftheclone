import Link from 'next/link';

const Header = () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/stats">
      <a>Stats</a>
    </Link>
    <Link href="/inventory">
      <a>Inventory</a>
    </Link>
    <Link href="/aspects">
      <a>Aspects</a>
    </Link>
  </div>
);

export default Header;
