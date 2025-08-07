const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory storage for books
let books = [];
let nextId = 1;

// GET /books - Return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Add a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required.' });
  }
  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;
  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  if (title) book.title = title;
  if (author) book.author = author;
  res.json(book);
});

// DELETE /books/:id - Remove a book by ID
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found.' });
  }
  const deletedBook = books.splice(index, 1)[0];
  res.json(deletedBook);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
