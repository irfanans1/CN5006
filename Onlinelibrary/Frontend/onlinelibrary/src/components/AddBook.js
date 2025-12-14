import React, { useState } from "react";
import { API } from "../api";

export default function AddBook() {
  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    API.post("/addbooks", state)
      .then(() => alert("Book added!"))
      .catch((err) => {
        console.error(err);
        alert("Failed to add book");
      });
  };

  return (
    <div style={{ marginTop: 10 }}>
      <h3>Add Book</h3>
      <form onSubmit={onSubmit}>
        <label>Book Title:</label>
        <input className="form-control" name="booktitle" value={state.booktitle} onChange={handleChange} />

        <label>Author:</label>
        <input className="form-control" name="author" value={state.author} onChange={handleChange} />

        <label>Topic:</label>
        <select className="form-control" name="Topic" value={state.Topic} onChange={handleChange}>
          <option value="">Select topic</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Programming">Programming</option>
          <option value="AI">AI</option>
        </select>

        <label>Format:</label><br />
        <input type="radio" name="formate" value="Hard Copy" checked={state.formate === "Hard Copy"} onChange={handleChange} /> Hard Copy
        <input type="radio" name="formate" value="Electronic Copy" checked={state.formate === "Electronic Copy"} onChange={handleChange} style={{ marginLeft: 12 }} /> Electronic Copy

        <label style={{ display: "block", marginTop: 12 }}>Publication Year:</label>
        <input type="range" className="form-range" min="1980" max="2025" name="PubYear" value={state.PubYear} onChange={handleChange} />
        <span>{state.PubYear}</span>

        <br /><br />
        <button className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
}
