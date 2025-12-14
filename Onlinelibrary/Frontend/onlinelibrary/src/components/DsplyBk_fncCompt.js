import React, { useEffect, useState } from "react";
import { API } from "../api";
import DisplayData from "./DisplayData";

export default function DisplayBooks() {
  const [Books, setBooks] = useState([]);

  useEffect(() => {
    API.get("/allbooks")
      .then((res) => setBooks(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load books");
      });
  }, []);

  return (
    <div>
      <h3>Book List</h3>
      <DisplayData Books={Books} />
    </div>
  );
}
