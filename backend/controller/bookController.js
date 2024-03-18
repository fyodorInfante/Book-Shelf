import mongoose from "mongoose";
import bookModel from "../model/bookModel.js";

// create a book

const createBook = async (req, res) => {
  const { title, author, description } = req.body;

  try {
    const book = await bookModel.create({ title, author, description });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// get all books
const getBooks = async (req, res) => {
  try {
    const books = await bookModel.find({}); //.sort({ createdAt: -1 })
    res.status(200).json(books);
  } catch (error) {
    res.status(404).json({ error: "no such books" });
  }
};

// get a single book
const getBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: "no such books" });
  }
};

// delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.findOneAndDelete({ _id: id });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: "no such book" });
  }
};

// update a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await bookModel.findOneAndUpdate({ _id: id }, { ...req.body });
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ error: "no such book" });
  }
};

export { createBook, getBooks, getBook, deleteBook, updateBook };
