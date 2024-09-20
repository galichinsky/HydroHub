import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as workoutsService from "../../services/workoutsService";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function EditWorkoutPage() {
  const navigate = useNavigate();
  const { workoutId } = useParams();
  const [workoutData, setWorkoutData] = useState({
    title: '',
    category: [],
    intensity: [],
    totalDistance: '',
    totalTime: '',
    workout: '',
  });
  
  const [editorConent, setEditorContent] = useState("");

  const categories = [
    "Freestyle", "Backstroke", "Breaststroke", "Butterfly", "IM",
    "Kick", "Pull", "Drill", "Sprint", "Distance", "Technique",
    "Endurance", "Speed", "Strength", "Recovery", "Warm-up", "Cool-down"
  ];

  const intensities = ["Easy", "Moderate", "Hard", "All-out"];
  const courses = ["SCM", "SCY", "LCM"];
  

  useEffect(() => {
    async function fetchWorkout() {
      const workout = await workoutsService.getOne(workoutId);
      setWorkoutData(workout);
      setEditorContent(workout.workout);
    }
    fetchWorkout();
  }, [workoutId]);

  function handleChange(evt) {
    setWorkoutData({ ...workoutData, [evt.target.name]: evt.target.value });
  }

  function handleEditorChange(value) {
    setEditorContent(value);
    setWorkoutData({ ...workoutData, workout: value });
  }

  function handleMultiSelect(evt) {
    const { name, options } = evt.target;
    const selectedValues = Array.from(options).filter(o => o.selected).map(o => o.value);
    setWorkoutData({ ...workoutData, [name]: selectedValues });
  }

  async function handleUpdateWorkout(evt) {
    evt.preventDefault();
    await workoutsService.update(workoutId, workoutData);
    navigate("/workouts");
  }

  return (
    <form onSubmit={handleUpdateWorkout}>
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
        <ReactQuill
          theme="snow"
          name="workout"
          id="workout-input"
          value={editorConent}
          onChange={handleEditorChange}
          required
        />
      </div>

      <button type="submit">Update</button>
    </form>
  );
}

