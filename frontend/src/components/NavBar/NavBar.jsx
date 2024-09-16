import { Link } from "react-router-dom";
import * as authService from "../../services/authService";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/workouts" className="workouts-link">🏊🏼</Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/workouts/new" >
            <FontAwesomeIcon icon={faPlus} />
            &nbsp;
            New Workout
          </Link>
          &nbsp; | &nbsp;
          <span>
            <FontAwesomeIcon icon={faUser} />
            &nbsp;{user.name}
          </span>
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
          {/* &nbsp; | &nbsp;
          <Link to="/signup">Sign Up</Link> */}
        </>
      )}
    </nav>
  );
}
