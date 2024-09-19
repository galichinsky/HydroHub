import { Link } from "react-router-dom";
import "./HomePage.css";
import { getUser } from "../../services/authService";

export default function HomePage() {
  const user = getUser();
  return (
    <>
      <h1 className="heading">HydroHub</h1>
      <div className="homepage-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">Unlock Your Swim Potential</h1>
            <p className="hero-subtitle">
              Discover and share swim workouts tailored to your needs.
            </p>
            <Link className="hero-btn" to="/workouts">
              Explore Workouts
            </Link>
            &nbsp; &nbsp;
            {user ? (
              <Link className="hero-btn" to="/workouts/new">
                Create a Workout
              </Link>
            ) : (
            <Link className="hero-btn" to="/login">
              Create a Workout
            </Link>)}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="feature">
            <i className="fas fa-swimmer feature-icon"></i>
            <h2>Explore</h2>
            <p>Find swim workouts based on category, difficulty, or goal.</p>
          </div>
          <div className="feature">
            <i className="fas fa-chart-line feature-icon"></i>
            <h2>Track</h2>
            <p>Save and track your swim progress and favorite workouts.</p>
          </div>
          <div className="feature">
            <i className="fas fa-share-alt feature-icon"></i>
            <h2>Share</h2>
            <p>
              Connect with the swim community and share your favorite workouts.
            </p>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>© 2024 HydroHub. All rights reserved.</p>
      </footer>
    </>
  );
}
