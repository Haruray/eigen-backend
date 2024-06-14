import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entities/book.interface';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Book')
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({ summary: 'Get all books' })
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  @ApiOperation({ summary: 'Create book' })
  @Post()
  async create(@Body(ValidationPipe) book: CreateBookDto): Promise<Book> {
    return await this.bookService.create(book);
  }
}
