import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { DatabaseModule } from 'src/database/resource/database.module';
import { memberProviders } from './member.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [MemberController],
  providers: [MemberService, ...memberProviders],
})
export class MemberModule {}
