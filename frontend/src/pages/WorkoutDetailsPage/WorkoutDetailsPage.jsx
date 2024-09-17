import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as workoutsService from "../../services/workoutsService";
import "./WorkoutDetailsPage.css";

export default function WorkoutDetailsPage() {
  const { workoutId } = useParams();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  
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

  return (
    <div className="workout-details">
      <h1>{workout.title}</h1>
      <p><strong>Category:</strong> {workout.category.join(" ")}</p>
      <p><strong>Intensity:</strong> {workout.intensity.join(" ")}</p>
      <p><strong>Total Distance:</strong> {workout.totalDistance} meters</p>
      <p><strong>Total Time:</strong> {workout.totalTime} minutes</p>
      <p><strong>Description:</strong> {workout.description}</p>
      <p><strong>By:</strong> {workout.author.name}</p>
      <p><strong>Created on:</strong> {new Date(workout.createdAt).toLocaleDateString()}</p>
    </div>
  );
}