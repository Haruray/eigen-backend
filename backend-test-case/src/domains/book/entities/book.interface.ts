import { Document } from 'mongoose';

export interface Book extends Document {
  _id: string;
  code: string;
  title: string;
  author: string;
  stock: number;
}
