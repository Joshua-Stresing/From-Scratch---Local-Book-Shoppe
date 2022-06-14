const { Router } = require('express');
const Book = require('../model/Book');

module.exports = Router().get('/', async (req, res) => {
  const bookList = await Book.getAll();
  res.json(bookList);
});
