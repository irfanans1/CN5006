import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Book_Form from "./components/AddBook";
import Book_UpDateForm from "./components/BookUpdate";
import FncDisplayBooks from "./components/DsplyBk_fncCompt";
import DeleteBook from "./components/Delete_Book";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <center><h2>Online Book Library</h2></center>
          <br />

          <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <Link to="/" className="navbar-brand"><h4>Add a Book</h4></Link>
            <Link to="/DisplayBooksF1" className="navbar-brand"><h4>Display All Books</h4></Link>
          </nav>

          <br />

          <Routes>
            <Route path="/" element={<Book_Form />} />
            <Route path="/DisplayBooksF1" element={<FncDisplayBooks />} />
            <Route path="/edit/:id" element={<Book_UpDateForm />} />
            <Route path="/Delete/:id" element={<DeleteBook />} />
          </Routes>
        </div>
      </Router>
    );
  }
}
