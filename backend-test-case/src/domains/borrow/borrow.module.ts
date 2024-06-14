import { DatabaseModule } from 'src/database/resource/database.module';
import { BorrowService } from './borrow.service';
import { borrowProviders } from './borrow.providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [BorrowService, ...borrowProviders],
})
export class BorrowModule {}
