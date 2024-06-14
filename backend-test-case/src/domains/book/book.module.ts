import { DatabaseModule } from 'src/database/resource/database.module';
import { BookService } from './book.service';
import { bookProviders } from './book.providers';
import { Module } from '@nestjs/common';
import { BookController } from './book.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController],
  providers: [BookService, ...bookProviders],
})
export class BookModule {}
