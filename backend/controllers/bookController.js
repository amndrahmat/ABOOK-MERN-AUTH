const Book = require("../models/bookModel");
const mongoose = require("mongoose");

const getBooks = async (req, res) => {
  const user_id = req.user._id;

  const books = await Book.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Id" });
  }

  const book = await Book.findById(id);
  if (!book) {
    return res.status(404).json({ error: "No Such book" });
  }

  res.status(200).json(book);
};

const createBook = async (req, res) => {
  const { title, page, category, language, author, description } = req.body;
  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!page) {
    emptyFields.push("page");
  }
  if (!category) {
    emptyFields.push("category");
  }
  if (!language) {
    emptyFields.push("language");
  }
  if (!author) {
    emptyFields.push("author");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }
  try {
    const user_id = req.user._id;
    const book = await Book.create({
      title,
      page,
      category,
      language,
      author,
      description,
      user_id,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Id" });
  }

  const book = await Book.findOneAndDelete({ _id: id });
  if (!book) {
    return res.status(404).json({ error: "No Such book" });
  }

  res.status(200).json(book);
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No Such Id" });
  }

  const book = await Book.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!book) {
    return res.status(404).json({ error: "No Such book" });
  }

  res.status(200).json(book);
};

module.exports = {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
};
