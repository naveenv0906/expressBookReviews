// router/general.js
const express = require('express');
const axios = require('axios');
let books = require('./booksdb.js');
let isValid = require('./auth_users.js').isValid;
let users = require('./auth_users.js').users;
const public_users = express.Router();

// Task 10: Get all books using async/await
public_users.get('/', async function (req, res) {
  try {
    const allBooks = books;
    return res.status(200).json({ books: allBooks });
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books", error: error.message });
  }
});

// Task 11: Get book by ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Task 12: Get books by Author using async/await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  const booksByAuthor = [];
  for (let key in books) {
    if (books[key].author === author) {
      booksByAuthor.push(books[key]);
    }
  }
  if (booksByAuthor.length > 0) {
    return res.status(200).json({ books: booksByAuthor });
  } else {
    return res.status(404).json({ message: "No books found for this author" });
  }
});

// Task 13: Get book by Title using async/await
public_users.get('/title/:title', async function (req, res) {
  const title = req.params.title;
  for (let key in books) {
    if (books[key].title === title) {
      return res.status(200).json(books[key]);
    }
  }
  return res.status(404).json({ message: "No books found with this title" });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const reviews = books[isbn]?.reviews || {};
  return res.status(200).json({ reviews: reviews });
});

module.exports.general = public_users;
