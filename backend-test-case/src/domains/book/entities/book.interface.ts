import { Document } from 'mongoose';

export interface Book extends Document {
  code: string;
  title: string;
  author: string;
  stock: number;
  borrowedBy: string;
}
