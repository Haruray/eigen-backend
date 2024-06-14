import { Document } from 'mongoose';

export interface Borrow extends Document {
  book: string;
  member: string;
  borrowDate: Date;
  returnDate: Date;
  isReturned: boolean;
}
