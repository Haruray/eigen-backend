import * as mongoose from 'mongoose';

export const MemberSchema = new mongoose.Schema({
  code: { type: String, unique: true },
  name: String,
  isInPenalty: Boolean,
  lastBookReturnedTimeStamps: Date,
});
