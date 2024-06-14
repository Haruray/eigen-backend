import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  title: String,
  author: String,
  stock: Number,
});
