import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as workoutsService from "../../services/workoutsService";
import "./WorkoutDetailsPage.css";
import CommentFormPage from "../CommentFormPage/CommentFormPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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
  };

  const handleAddComment = async (comment) => {
    const updatedWorkout = await workoutsService.addComment(workoutId, comment);
    setWorkout(updatedWorkout);
  };

  const handleDeleteComment = async (commentId) => {
    const updatedWorkout = await workoutsService.removeComment(
      workoutId,
      commentId
    );
    setWorkout(updatedWorkout);
  }

  return (
    <>
      <>
        <div className="workout-details">
          <h1>
            {workout.title}{" "}
            <p>
              <FontAwesomeIcon icon={faUser} /> &nbsp;{workout.author.name}
            </p>
          </h1>
          <span>
            <p>
              <strong>Created on:</strong>{" "}
              {new Date(workout.createdAt).toLocaleDateString()}
            </p>
          </span>
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
          <div>
            <h3>
              <strong>Workout:</strong>
            </h3>{" "}
            <div dangerouslySetInnerHTML={{ __html: workout.workout }}></div>
          </div>
        </div>
        {workout.author._id === user._id && (
          <div>
            <Link className="edit" to={`/workouts/${workout._id}/edit`}>
              Edit
            </Link>
            <button onClick={() => handleDeleteWorkout(workoutId)}>
              Delete
            </button>
          </div>
        )}
      </>
      <br />
      <section>
        <h3>Comments</h3>
        {!workout.comments.length && <p>There are no comments...</p>}
      </section>

      {workout.comments.map((comment) => (
        <><div className="comment-container" key={comment._id}>
          <p>
            {" "}
            <FontAwesomeIcon icon={faUser} /> {comment.author.name} on{" "}
            {new Date(comment.createdAt).toLocaleDateString()}
          </p>
          <div dangerouslySetInnerHTML={{ __html: comment.text }}></div>
        </div></>
      ))}
      <CommentFormPage handleAddComment={handleAddComment} user={user} />
    </>
  );
}
