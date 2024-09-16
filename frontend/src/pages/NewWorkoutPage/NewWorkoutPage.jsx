import { useState } from "react";
import * as workoutsService from "../../services/workoutsService";
import { useNavigate } from "react-router-dom";

export default function NewWorkoutPage() {
  const [workoutData, setWorkoutData] = useState({
    title: '',
    category: [],
    intensity: [],
    totalDistance: '',
    totalTime: '',
    workout: '',
  });

  const categories = [
    "Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM",
    "Kick", "Pull", "Drill", "Sprint", "Distance", "Technique",
    "Endurance", "Speed", "Strength", "Recovery", "Warm-up", "Cool-down"
  ];

  const intensities = ["Easy", "Moderate", "Hard", "All-out"];
  
  const navigate = useNavigate();

  function handleChange(evt) {
    setWorkoutData({ ...workoutData, [evt.target.name]: evt.target.value });
  }

  function handleMultiSelect(evt) {
    const { name, options } = evt.target;
    const selectedValues = Array.from(options).filter(o => o.selected).map(o => o.value);
    setWorkoutData({ ...workoutData, [evt.target.name]: selectedValues });
  }


  async function handleAddWorkout(evt) {
    evt.preventDefault();
    await workoutsService.create(workoutData);
    navigate("/workouts");
  }

  return (
    <form onSubmit={handleAddWorkout}>
      <div>
        <label htmlFor="title-input">Workout Name</label>
        <input
          type="text"
          name="title"
          id="title-input"
          value={workoutData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="category-input">Category (Select all that apply)</label>
        <select
        type="text"
          name="category"
          id="category-input"
          multiple
          value={workoutData.category}
          onChange={handleMultiSelect}
          required
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="intensity-input" >Intensity (Select all that apply)</label>
        <select
          type="text"
          name="intensity"
          id="intensity-input"
          multiple
          value={workoutData.intensity}
          onChange={handleMultiSelect}
          required
        >
          {intensities.map(intensity => (
            <option key={intensity} value={intensity}>
              {intensity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="totalDistance-input">Total Distance (meters)</label>
        <input
          type="number"
          name="totalDistance"
          id="totalDistance-input"
          value={workoutData.totalDistance}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="totalTime-input">Total Time (minutes)</label>
        <input
          type="number"
          name="totalTime"
          id="totalTime-input"
          value={workoutData.totalTime}
          onChange={handleChange}
          required
          min="0"
        />
      </div>

      <div>
        <label htmlFor="workout-input">Workout Description</label>
        <textarea
          name="workout"
          id="workout-input"
          value={workoutData.workout}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Create Workout</button>
    </form>
  );
}

