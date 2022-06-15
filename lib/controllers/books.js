const { Router } = require('express');
const { Book } = require('../models/Book');

module.exports = Router().get('/', async (req, res) => {
  const bookList = await Book.getAll();
  // console.log(bookList);
  res.json(bookList);
});
