import { useState } from "react";
import * as workoutsService from "../../services/workoutsService";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

export default function NewWorkoutPage() {
  const [workoutData, setWorkoutData] = useState({
    title: "",
    category: [],
    intensity: [],
    totalDistance: "",
    totalTime: "",
    workout: "",
  });

  const categories = [
    "Freestyle",
    "Backstroke",
    "Breaststroke",
    "Butterfly",
    "IM",
    "Kick",
    "Pull",
    "Drill",
    "Sprint",
    "Distance",
    "Technique",
    "Endurance",
    "Speed",
    "Strength",
    "Recovery",
    "Warm-up",
    "Cool-down",
  ];

  const intensities = ["Easy", "Moderate", "Hard", "All-out"];
  const courses = ["SCM", "SCY", "LCM"];

  const categoryOptions = categories.map((category) => ({
    name: category,
    label: category,
  }));

  const navigate = useNavigate();

  function handleChange(evt) {
    setWorkoutData({ ...workoutData, [evt.target.name]: evt.target.value });
  }

  function handleMultiSelect(evt) {
    const { name, options } = evt.target;
    const selectedValues = Array.from(options)
      .filter((o) => o.selected)
      .map((o) => o.value);
    setWorkoutData({ ...workoutData, [evt.target.name]: selectedValues });
  }

  function handleCheckboxChange(evt) {
    const { name, checked } = evt.target;
    if (checked) {
      setWorkoutData({
        ...workoutData,
        category: [...workoutData.category, name],
      });
    } else {
      setWorkoutData({
        ...workoutData,
        category: workoutData.category.filter((item) => item !== name),
      });
    }
  }

  async function handleAddWorkout(evt) {
    evt.preventDefault();
    await workoutsService.create(workoutData);
    navigate("/workouts");
  }

  return (
    <form onSubmit={handleAddWorkout}>
      {/* <h1>{workoutId ? "Edit Workout" : "New Workout"}</h1> */}
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
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="intensity-input">
          Intensity (Select all that apply)
        </label>
        <select
          type="text"
          name="intensity"
          id="intensity-input"
          multiple
          value={workoutData.intensity}
          onChange={handleMultiSelect}
          required
        >
          {intensities.map((intensity) => (
            <option key={intensity} value={intensity}>
              {intensity}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="course-input">Course</label>
        <select
          type="text"
          name="course"
          id="course-input"
          value={workoutData.course}
          onChange={handleMultiSelect}
          required
          >
          {courses.map((course) => (
            <option key={course} value={course}>
              {course}
            </option>
          ))}
          </select>
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
        <label htmlFor="workout-input">Workout</label>
        <textarea
          name="workout"
          id="workout-input"
          value={workoutData.workout}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
