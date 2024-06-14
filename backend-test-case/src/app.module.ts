import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './domains/member/member.module';
import { BookModule } from './domains/book/book.module';
import { DatabaseModule } from './database/resource/database.module';
import { memberProviders } from './domains/member/member.providers';
import { bookProviders } from './domains/book/book.providers';
import { BorrowModule } from './domains/borrow/borrow.module';
import { borrowProviders } from './domains/borrow/borrow.providers';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MemberModule,
    BookModule,
    DatabaseModule,
    BorrowModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...memberProviders,
    ...bookProviders,
    ...borrowProviders,
  ],
})
export class AppModule {}
