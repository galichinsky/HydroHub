import { useState } from 'react';
import * as authService from '../../services/authService';
import './SignUpPage.css';

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    name: '',
    hometown: '',
    events: [''],
    goals: [''],
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.signUp(formData);
      setUser(user);
    } catch (err) {
      // An error occurred
      console.log(err);
      setErrorMsg('Sign Up Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <h2 className='sign-up'>Sign Up!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label>Hometown</label>
        <input
          type="text"
          name="hometown"
          value={formData.hometown}
          onChange={handleChange}
          required
        />
        <label>Events</label>
        <input
        placeholder='Separate with a ","'
          type="text"
          name="events"
          value={formData.events}
          onChange={handleChange}
          required
        />
        <label>Goals</label>
        <input
        placeholder='Separate with a ","'
          type="text"
          name="goals"
          value={formData.goals}
          onChange={handleChange}
          required
        />
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
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
        <button className='signup-btn' type="submit" disabled={disable}>
          SIGN UP
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}
