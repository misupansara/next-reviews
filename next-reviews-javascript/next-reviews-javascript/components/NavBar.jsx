import { getUserFromSession } from '@/lib/auth';
import NavLink from './NavLink';
import SignOutButton from './SignOutButton';

export default async function NavBar() {
  const user = await getUserFromSession();
  console.log('[NavBar] user:', user);
  return (
    <nav>
      <ul className="flex gap-2">
        <li className="font-bold font-orbitron">
          <NavLink href="/">
            Indie Gamer
          </NavLink>
        </li>
        <li className="ml-auto">
          <NavLink href="/reviews">
            Reviews
          </NavLink>
        </li>
        <li>
          <NavLink href="/about" prefetch={false}>
            About
          </NavLink>
        </li>
        {user ? (
          <li>
            <SignOutButton />
          </li>
        ) : (
        <li>
          <NavLink href="/sign-in">
            Sign in
          </NavLink>
        </li>
        )}
      </ul>
    </nav>
  );
}
