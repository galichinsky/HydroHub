import { useState } from "react";
import "./CommentFormPage.css";
import ReactQuill from "react-quill";
import { set } from "mongoose";

const CommentFormPage = ({ handleAddComment }) => {
  const [editorConent, setEditorContent] = useState("");
  const [formData, setFormData] = useState({
    text: "",
  });
    console.log(formData);
  // const handleChange = (e) => {
  //   setFormData({
  //     [e.target.name]: e.target.value,
  //   });
  // };

  function handleEditorChange(value) {
    setEditorContent(value);
    setFormData({ text: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddComment(formData);
    setFormData({
      text: "",
    });
    setEditorContent("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <ReactQuill
      placeholder='Comment here...'
          theme="snow"
          name="text"
          id="text-input"
          value={editorConent}
          onChange={handleEditorChange}
          required
        />
      {/* <textarea
        name="text"
        id="text-input"
        value={formData.text}
        onChange={handleChange}
        placeholder="Add a comment..."
        required
      ></textarea> */}
      <br />
      <br />
      <button className="comment-btn" type="submit">Post Comment</button>
    </form>
  );
};

export default CommentFormPage;
