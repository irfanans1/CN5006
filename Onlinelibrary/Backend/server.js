// server.js
const express = require("express");
const cors = require("cors");
const connectDB = require("./MongoDBConnect");
const Books = require("./BooksSchema");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: "https://fluffy-happiness-v6vgjqwgxqqjhp4ww-3000.app.github.dev",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));


app.get("/", (req, res) => {
  res.send("Online Library API is running...");
});

// Get book count
app.get("/about", async (req, res) => {
  const count = await Books.countDocuments();
  res.send(`MongoDB Express React App. Total books: ${count}`);
});

/* -----------------------
        CRUD ROUTES
------------------------- */

// 1) Get all books
app.get("/allbooks", async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

// 2) Get one book by ID
app.get("/getbook/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch book" });
  }
});

// 3) Add new book
app.post("/addbooks", async (req, res) => {
  try {
    const newbook = new Books(req.body);
    await newbook.save();
    res.status(200).json({ message: "Book added successfully!", book: newbook });
  } catch (err) {
    res.status(400).json({ error: "Adding book failed", details: err.message });
  }
});

// 4) Update a book
app.post("/updatebook/:id", async (req, res) => {
  try {
    const updatedBook = await Books.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedBook) return res.status(404).json({ error: "Book not found" });

    res.json({ message: "Book updated!", book: updatedBook });
  } catch (err) {
    res.status(500).json({ error: "Update failed", details: err.message });
  }
});

// 5) Delete a book
app.post("/deleteBook/:id", async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ error: "Book not found" });

    res.send("Book Deleted");
  } catch (err) {
    res.status(500).json({ error: "Delete failed", details: err.message });
  }
});

/* -----------------------
     START SERVER
------------------------- */

(async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
})();
