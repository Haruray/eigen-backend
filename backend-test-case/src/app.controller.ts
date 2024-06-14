import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BorrowDto } from './dto/borrow.dto';
import { ReturnDto } from './dto/return.dto';

@ApiTags('app - main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('migrate-mocks-to-database')
  async migrateMocksToDatabase(): Promise<string> {
    await this.appService.reset();
    return 'Migration completed';
  }

  @Post('borrow')
  async borrow(
    @Body(ValidationPipe)
    data: BorrowDto,
  ): Promise<string> {
    try {
      await this.appService.borrow(
        data.bookId,
        data.memberId,
        new Date(data.borrowDate),
      );
      return 'Borrow success';
    } catch (error) {
      return error.message;
    }
  }

  @Post('return')
  async return(
    @Body(ValidationPipe)
    data: ReturnDto,
  ): Promise<string> {
    try {
      await this.appService.return(
        data.bookId,
        data.memberId,
        new Date(data.returnDate),
      );
      return 'Return success';
    } catch (error) {
      return error.message;
    }
  }
}
