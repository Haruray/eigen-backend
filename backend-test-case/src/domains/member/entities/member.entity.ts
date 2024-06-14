import { Document } from 'mongoose';

export interface Member extends Document {
  _id: string;
  code: string;
  name: string;
  isInPenalty: boolean;
  lastBookReturnedTimeStamps: Date;
}
