import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @ApiOperation({ summary: 'Create member' })
  @Post()
  async create(@Body() createMemberDto: CreateMemberDto) {
    return await this.memberService.create(createMemberDto);
  }

  @ApiOperation({ summary: 'Get all members' })
  @Get()
  async findAll() {
    return await this.memberService.findAll();
  }

  @ApiOperation({ summary: 'Get member by id' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.memberService.findOne(+id);
  }
}
