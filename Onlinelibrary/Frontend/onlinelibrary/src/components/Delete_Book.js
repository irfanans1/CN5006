import React, { useEffect } from "react";
import { API } from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function DeleteBook() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    if (window.confirm("Delete this book?")) {
      API.post("/deleteBook/" + id)
        .then(() => {
          alert("Book deleted");
          navigate("/DisplayBooksF1");
        })
        .catch((err) => {
          console.error(err);
          alert("Failed to delete book");
        });
    } else {
      navigate("/DisplayBooksF1");
    }
  }, [id, navigate]);

  return <h3>Deleting book...</h3>;
}
