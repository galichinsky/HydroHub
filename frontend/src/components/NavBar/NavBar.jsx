import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/workouts">🏊🏼</Link>
      &nbsp; | &nbsp;
    {user ? (
        <>
          <Link to="/workouts/new">New Workout</Link>
          &nbsp; | &nbsp;
          <span>{user.name}</span>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
        </>
      ) : (
        <>
          <Link to="/login">New Workout</Link>
          &nbsp; | &nbsp;
          <Link to="/login">Log In</Link>
          &nbsp; | &nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}
