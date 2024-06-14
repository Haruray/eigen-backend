import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Book } from './domains/book/entities/book.interface';
import { Member } from './domains/member/entities/member.entity';
import { bookMock } from './mocks/book';
import { memberMock } from './mocks/member';

@Injectable()
export class AppService {
  constructor(
    @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
    @Inject('MEMBER_MODEL')
    private memberModel: Model<Member>,
  ) {}

  async reset() {
    //delete all books and members
    await this.bookModel.deleteMany({}).exec();
    await this.memberModel.deleteMany({}).exec();

    //create new books based on mock data
    await this.bookModel.insertMany(bookMock);
    //create new members based on mock data
    await this.memberModel.insertMany(memberMock);
  }
}
