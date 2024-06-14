import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { Book } from 'src/interface/book.interface';
import { CreateBookDto } from './create-book.dto';

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
