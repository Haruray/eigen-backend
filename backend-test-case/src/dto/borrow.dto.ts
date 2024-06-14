import { ApiProperty } from '@nestjs/swagger';

export class BorrowDto {
  @ApiProperty({ type: 'string', description: 'The book id' })
  bookId: string;
  @ApiProperty({ type: 'string', description: 'The member id' })
  memberId: string;
  @ApiProperty({
    type: 'string',
    description: 'The borrow date',
    default: new Date(),
  })
  borrowDate: Date;
}
