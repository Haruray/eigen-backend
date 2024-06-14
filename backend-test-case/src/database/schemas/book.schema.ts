import * as mongoose from 'mongoose';

export const BookSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  title: String,
  author: String,
  stock: Number,
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
});
