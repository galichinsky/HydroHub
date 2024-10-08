import { useState } from "react";
import * as authService from "../../services/authService";
import { Link } from "react-router-dom";
import "./LogInPage.css";

export default function LogInPage({ setUser }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.logIn(formData);
      setUser(user);
    } catch (err) {
      // An error occurred
      setErrorMsg("Log In Failed - Try Again");
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg("");
  }

  return (
    <>
      <h2 className="log-in">Log In!</h2>
      <form className="login-form"  autoComplete="off" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button className="login-btn" type="submit">LOG IN</button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>

      <Link className="not-registered" to="/signup">
        Not Registered? Click here
      </Link>
    </>
  );
}
