import { ApiProperty } from '@nestjs/swagger';

export class ReturnDto {
  @ApiProperty({ type: 'string', description: 'The book id' })
  bookId: string;
  @ApiProperty({ type: 'string', description: 'The member id' })
  memberId: string;
  @ApiProperty({
    type: 'string',
    description: 'The return date',
    default: new Date(),
  })
  returnDate: Date;
}
