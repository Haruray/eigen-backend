import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateBorrowDto {
  @ApiProperty({ type: 'string', description: 'The book id' })
  @IsString()
  @IsNotEmpty()
  bookId: string;

  @ApiProperty({ type: 'string', description: 'The member id' })
  @IsString()
  @IsNotEmpty()
  memberId: string;

  @ApiProperty({ type: 'date', description: 'The borrow date' })
  @IsDate()
  borrowDate: Date;

  @ApiProperty({ type: 'date', description: 'The return date' })
  @IsDate()
  returnDate: Date;

  @ApiProperty({ type: 'boolean', description: 'The return status' })
  @IsBoolean()
  isReturned: boolean;
}
