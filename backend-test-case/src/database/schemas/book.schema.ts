import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  code: String,
  title: String,
  author: String,
  stock: Number,
});
