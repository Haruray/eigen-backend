import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  borrowings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});
