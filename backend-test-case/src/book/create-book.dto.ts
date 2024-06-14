import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ type: String, description: 'Book code', example: 'JK-45' })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    type: String,
    description: 'Book title',
    example: 'Harry Potter',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'Book author',
    example: 'J.K. Rowling',
  })
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty({
    type: Number,
    description: 'Book stock',
    example: 10,
  })
  @IsNotEmpty()
  @IsNumber()
  stock: number;
}
