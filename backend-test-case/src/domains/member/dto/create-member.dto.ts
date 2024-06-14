import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty({ type: String, description: 'Member code', example: 'M0001' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    type: String,
    description: 'Member name',
    example: 'Angga',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
