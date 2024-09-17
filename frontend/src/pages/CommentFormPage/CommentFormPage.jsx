import { useState } from "react";
import "./CommentFormPage.css";

const CommentFormPage = ({ handleAddComment }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setFormData({
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment(formData);
    setFormData({
      text: "",
    });
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <p>Comment here:</p>
      <textarea
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        placeholder="Add a comment..."
        required
      ></textarea>
      <button className="comment-btn" type="submit">Post Comment</button>
    </form>
  );
};

export default CommentFormPage;
