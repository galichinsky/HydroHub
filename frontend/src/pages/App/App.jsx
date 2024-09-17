import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "../../services/authService";
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import HomePage from "../HomePage/HomePage";
import WorkoutsListPage from "../WorkoutsListPage/WorkoutsListPage";
import NewWorkoutPage from "../NewWorkoutPage/NewWorkoutPage";
import WorkoutDetailsPage from "../WorkoutDetailsPage/WorkoutDetailsPage";
import EditWorkoutPage from "../EditWorkoutPage/EditWorkoutPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import LogInPage from "../LogInPage/LogInPage";


function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main id="react-app">
      <NavBar user={user} setUser={setUser} />
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workouts" element={<WorkoutsListPage user={user}/>} />
            <Route path="/workouts/new" element={<NewWorkoutPage />} />
            <Route
              path="/workouts/:workoutId/edit"
              element={
                <EditWorkoutPage user={user}/>
              }
            />
            <Route
              path="/workouts/:workoutId"
              element={<WorkoutDetailsPage user={user} />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/workouts" element={<WorkoutsListPage />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        )}
      </section>
    </main>
  );
}

export default App;
