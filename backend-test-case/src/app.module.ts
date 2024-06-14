import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './domains/member/member.module';
import { BookModule } from './domains/book/book.module';

@Module({
  imports: [MemberModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
