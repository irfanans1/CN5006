import React, { useEffect, useState } from "react";
import { API } from "../api";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function BookUpdate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    booktitle: "",
    author: "",
    formate: "",
    Topic: "",
    PubYear: 1990,
  });

  useEffect(() => {
    API.get("/getbook/" + id)
      .then((res) => setState(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load book");
      });
  }, [id]);

  const handleChange = (e) =>
    setState({ ...state, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    API.post("/updatebook/" + id, state)
      .then(() => {
        alert("Book updated!");
        navigate("/DisplayBooksF1");
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to update book");
      });
  };

  return (
    <div>
      <h3>Update Book</h3>
      <p>Update Book Id: {id}</p>

      <form onSubmit={onSubmit}>
        <label>Book Title:</label>
        <input className="form-control" name="booktitle" value={state.booktitle || ""} onChange={handleChange} />

        <label>Author:</label>
        <input className="form-control" name="author" value={state.author || ""} onChange={handleChange} />

        <label>Topic:</label>
        <select className="form-control" name="Topic" value={state.Topic || ""} onChange={handleChange}>
          <option value="">Select topic</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Programming">Programming</option>
          <option value="AI">AI</option>
        </select>

        <label style={{ display: "block", marginTop: 10 }}>Format:</label>
        <input type="radio" name="formate" value="Hard Copy" checked={state.formate === "Hard Copy"} onChange={handleChange} /> Hard Copy
        <input type="radio" name="formate" value="Electronic Copy" checked={state.formate === "Electronic Copy"} onChange={handleChange} style={{ marginLeft: 12 }} /> Electronic Copy

        <label style={{ display: "block", marginTop: 12 }}>Publication Year:</label>
        <input type="range" min="1980" max="2025" name="PubYear" value={state.PubYear || 1990} onChange={handleChange} />
        <span style={{ marginLeft: 10 }}>{state.PubYear}</span>

        <br /><br />
        <button className="btn btn-primary">Update</button>
        <Link to="/DisplayBooksF1" className="btn btn-secondary" style={{ marginLeft: 10 }}>Cancel</Link>
      </form>
    </div>
  );
}
