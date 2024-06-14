import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.interface';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
  ) {}

  async create(createCatDto: CreateBookDto): Promise<Book> {
    const createdCat = new this.bookModel(createCatDto);
    return createdCat.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }
}
