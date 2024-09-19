import { useState, useEffect } from "react";
import * as workoutsService from "../../services/workoutsService";
import "./UserListPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function UserListPage({ user }) {
  const [workouts, setWorkouts] = useState([]);
  const userWorkouts = workouts.filter(
    (workout) => workout.author._id === user._id
  );
  useEffect(() => {
    async function getWorkouts() {
      const workouts = await workoutsService.getAll();
      setWorkouts(workouts);
    }
    getWorkouts();
  }, []);

  if (!workouts.length) {
    return <h1>No workouts created yet...</h1>;
  }
  return (
    <>
      <h1 className="list-header">{user.name}'s Workouts</h1>
      <>
        {userWorkouts.length > 0 ? (
          userWorkouts.map((workout) => (
            <div className="workout-list">
              <Link to={`/workouts/${workout._id}`}>
                <article id="workout-card" key={workout._id}>
                  <p>
                    <strong>{workout.title}</strong>
                  </p>
                  <p>{workout.category.join(" | ")}</p>
                  <p>Intensity: {workout.intensity}</p>
                  <p>
                    <FontAwesomeIcon icon={faUser} /> By: {workout.author.name}
                  </p>
                  <p>
                    Created on:{" "}
                    {new Date(workout.createdAt).toLocaleDateString()}
                  </p>
                </article>
              </Link>
            </div>
          ))
        ) : (
          <p>No workouts created...</p>
        )}
      </>
    </>
  );
}
