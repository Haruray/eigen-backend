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
    return await createdCat.save();
  }

  async findAll(): Promise<Book[]> {
    const data = await this.bookModel.find().exec();
    // if stock is 0, delete the book from data
    return data.filter((book) => book.stock > 0);
  }
}
