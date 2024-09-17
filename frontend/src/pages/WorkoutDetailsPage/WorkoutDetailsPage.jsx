import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as workoutsService from "../../services/workoutsService";
import "./WorkoutDetailsPage.css";

export default function WorkoutDetailsPage({ user }) {

  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getWorkout() {
      const workout = await workoutsService.getOne(workoutId);
      setWorkout(workout);
      setLoading(false);
    }
    getWorkout();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!workout) {
    return <h1>Workout not found</h1>;
  }

  const handleDeleteWorkout = async (workoutId) => { 
    await workoutsService.remove(workoutId);
    navigate("/workouts");
  }

  return (
    <>
      <div className="workout-details">
        <h1>{workout.title}</h1>
        <p>
          <strong>Category:</strong> {workout.category.join(" ")}
        </p>
        <p>
          <strong>Intensity:</strong> {workout.intensity.join(" ")}
        </p>
        <p>
          <strong>Total Distance:</strong> {workout.totalDistance} meters
        </p>
        <p>
          <strong>Total Time:</strong> {workout.totalTime} minutes
        </p>
        <p>
          <strong>By:</strong> {workout.author.name}
        </p>
        <p>
          <strong>Created on:</strong>{" "}
          {new Date(workout.createdAt).toLocaleDateString()}
        </p>
        <p>
          <strong>Workout:</strong> {workout.workout}
        </p>
      </div>
      {workout.author._id === user._id &&  (
        <div>
          <Link to={`/workouts/${workout._id}/edit`}>Edit</Link>
          <button onClick={() => handleDeleteWorkout(workoutId)} >Delete</button>
        </div>
      )}
    </>
  );
}
