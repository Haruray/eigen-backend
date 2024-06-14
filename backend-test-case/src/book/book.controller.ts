import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from 'src/interface/book.interface';
import { CreateBookDto } from './create-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  async create(@Body(ValidationPipe) book: CreateBookDto): Promise<Book> {
    return this.bookService.create(book);
  }
}
