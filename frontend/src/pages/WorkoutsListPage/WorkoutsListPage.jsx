import { useState, useEffect } from "react";
import * as workoutsService from "../../services/workoutsService";
import "./WorkoutsListPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function WorkoutListPage() {
  const [workouts, setWorkouts] = useState([]);

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
      <h1>Workout List Page</h1>
      <div className="workout-list">
        {workouts.map((workout) => (
          <article id="workout-card" key={workout._id}>
            <p><strong>{workout.title}</strong></p>
            <p>{workout.category.join(" ")}</p>
            <p>Intensity: {workout.intensity}</p>
            <p><FontAwesomeIcon icon={faUser} /> By: {workout.author.name}</p>
            <p>
              Created on: {new Date(workout.createdAt).toLocaleDateString()}
            </p>
          </article>
        ))}
      </div>
    </>
  );
}
