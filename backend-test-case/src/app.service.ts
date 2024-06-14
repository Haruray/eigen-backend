import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Book } from './domains/book/entities/book.interface';
import { Member } from './domains/member/entities/member.entity';
import { bookMock } from './mocks/book';
import { memberMock } from './mocks/member';
import { Borrow } from './domains/borrow/entities/borrow.interface';

@Injectable()
export class AppService {
  constructor(
    @Inject('BOOK_MODEL')
    private bookModel: Model<Book>,
    @Inject('MEMBER_MODEL')
    private memberModel: Model<Member>,
    @Inject('BORROW_MODEL')
    private borrowModel: Model<Borrow>,
  ) {}

  async reset() {
    //delete all books and members
    await this.bookModel.deleteMany({}).exec();
    await this.memberModel.deleteMany({}).exec();
    await this.borrowModel.deleteMany({}).exec();

    //create new books based on mock data
    await this.bookModel.insertMany(bookMock);
    //create new members based on mock data
    await this.memberModel.insertMany(memberMock);
  }

  async borrow(
    bookId: string,
    memberId: string,
    borrowDate: Date,
  ): Promise<Borrow> {
    //make sure book and member exist
    const book: Book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    const member: Member = await this.memberModel.findById(memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    //make sure book is in stock
    if (book.stock <= 0) {
      throw new Error('Book is out of stock');
    }
    //if member has penalty, time between lastBookReturnedTimeStamps and now should be more than 3 days
    var isValidForBorrow = member.isInPenalty
      ? borrowDate.getTime() - member.lastBookReturnedTimeStamps.getTime() >
        3 * 24 * 60 * 60 * 1000
      : true;

    //member is not allowed to borrow book if already borrowed 2 books and has not returned them
    const borrowedBooks = await this.borrowModel.find({ member: memberId });
    const borrowedBooksCount = borrowedBooks.reduce((acc, borrow) => {
      if (!borrow.returnDate) {
        acc++;
      }
      return acc;
    }, 0);
    isValidForBorrow = isValidForBorrow && borrowedBooksCount < 2;

    if (!isValidForBorrow) {
      throw new Error('Member is not allowed to borrow book');
    }
    // remove penalty if member has returned the book
    if (member.isInPenalty) {
      member.isInPenalty = false;
      await member.save();
    }
    //decrease book stock
    book.stock--;
    await book.save();
    //create new borrow data
    const data = new this.borrowModel({
      book: bookId,
      member: memberId,
      borrowDate,
    });
    return await data.save();
  }

  async return(
    bookId: string,
    memberId: string,
    returnDate: Date,
  ): Promise<Borrow> {
    //make sure book and member exist
    const book: Book = await this.bookModel.findById(bookId);
    if (!book) {
      throw new Error('Book not found');
    }
    const member: Member = await this.memberModel.findById(memberId);
    if (!member) {
      throw new Error('Member not found');
    }
    //make sure member has borrowed the book
    const borrow: Borrow = await this.borrowModel.findOne({
      book: bookId,
      member: memberId,
      returnDate: null,
    });
    if (!borrow) {
      throw new Error('Member has not borrowed the book');
    }
    // if return date is more than 7 days from borrow date, member will get penalty
    const isLateReturn =
      returnDate.getTime() - borrow.borrowDate.getTime() >
      7 * 24 * 60 * 60 * 1000;
    if (isLateReturn) {
      member.isInPenalty = true;
      member.lastBookReturnedTimeStamps = returnDate;
      await member.save();
    }
    //increase book stock
    book.stock++;
    await book.save();
    //update borrow data
    borrow.returnDate = returnDate;
    return await borrow.save();
  }
}
