import { useState, useEffect } from 'react';
import * as workoutsService from '../../services/workoutsService';

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
    return <h1>No workouts created yet...</h1>
  }
  return (
  <>
    <h1>Workout List Page</h1>
    {workouts.map(workout => <article key={workout._id}>{workout.title}</article>)}
  </>
  )
}
