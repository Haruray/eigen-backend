import { Document } from 'mongoose';

export interface Member extends Document {
  code: string;
  name: string;
  borrowings: string[];
}
