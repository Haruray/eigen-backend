import * as mongoose from 'mongoose';

export const BorrowSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
  member: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' },
  borrowDate: Date,
  returnDate: Date,
});
