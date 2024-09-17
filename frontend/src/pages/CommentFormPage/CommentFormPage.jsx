import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      <textarea
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        placeholder="Add a comment..."
        required
      ></textarea>
      <button type="submit">Post Comment</button>
    </form>
  );
};

export default CommentFormPage;
