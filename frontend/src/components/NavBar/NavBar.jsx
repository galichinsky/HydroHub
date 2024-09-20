import { Link } from "react-router-dom";
import * as authService from "../../services/authService";
import "./NavBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus, faArrowRightFromBracket, faDumbbell, faWater } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/" className="workouts-link"><FontAwesomeIcon icon={faWater} fade /></Link>
      &nbsp; | &nbsp;
      <Link to="/workouts"><FontAwesomeIcon icon={faDumbbell} bounce />&nbsp; Workouts</Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/workouts/new" >
            <FontAwesomeIcon icon={faPlus} bounce/>
            &nbsp;
            New Workout
          </Link>
          &nbsp; | &nbsp;
          <span>
            <Link to={`/userWorkouts`}>
            <FontAwesomeIcon icon={faUser} beat/>
            &nbsp;{user.name}
            </Link>
          </span>
          |
          &nbsp;
          <Link className="logout" to="" onClick={handleLogOut}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} beat /> &nbsp;Log Out 
          </Link>
        
        </>
      ) : (
        <>
          <Link to="/login"><FontAwesomeIcon icon={faPlus} style={{color: "#fefefe"}} bounce/> New Workout</Link>
          &nbsp; | &nbsp;
          <Link className="login" to="/login"><FontAwesomeIcon icon={faArrowRightFromBracket} beat /> &nbsp;Log In</Link>
        </>
      )}
    </nav>
  );
}
