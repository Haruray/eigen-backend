import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Borrow } from './entities/borrow.interface';
import { CreateBorrowDto } from './dto/create-borrow.dto';

@Injectable()
export class BorrowService {
  constructor(
    @Inject('BORROW_MODEL')
    private borrowModel: Model<Borrow>,
  ) {}

  async create(createBorrowDto: CreateBorrowDto): Promise<Borrow> {
    const data = new this.borrowModel(createBorrowDto);
    return await data.save();
  }
}
