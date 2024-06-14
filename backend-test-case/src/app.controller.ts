import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('app - main')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('migrate-mocks-to-database')
  async migrateMocksToDatabase(): Promise<string> {
    await this.appService.reset();
    return 'Migration completed';
  }
}
