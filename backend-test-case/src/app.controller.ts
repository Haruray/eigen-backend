import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BorrowDto } from './dto/borrow.dto';
import { ReturnDto } from './dto/return.dto';

@ApiTags('App - Main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Migrate mocks to database and reset existing data',
  })
  @Get('migrate-mocks-to-database')
  async migrateMocksToDatabase(): Promise<string> {
    await this.appService.reset();
    return 'Migration completed';
  }

  @ApiOperation({ summary: 'Borrow a book' })
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

  @ApiOperation({ summary: 'Return a book' })
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
