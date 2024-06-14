import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Model } from 'mongoose';
import { Member } from './entities/member.entity';
import { Borrow } from '../borrow/entities/borrow.interface';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_MODEL')
    private memberModel: Model<Member>,
    @Inject('BORROW_MODEL')
    private borrowModel: Model<Borrow>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const createdBook = new this.memberModel(createMemberDto);
    return await createdBook.save();
  }

  async findAll() {
    const data = await this.memberModel.find().exec();
    // get number of borrowed books for each member
    const borrowedBooks = await this.borrowModel.find().exec();
    const borrowedBooksCount = borrowedBooks.reduce((acc, borrow) => {
      if (!borrow.returnDate) {
        acc[borrow.member] = (acc[borrow.member] || 0) + 1;
      }
      return acc;
    }, {});

    return data.map((member) => {
      return {
        ...member.toObject(),
        borrowedBooksCount: borrowedBooksCount[member._id.toString()] || 0,
      };
    });
  }

  async findOne(id: number) {
    const book = await this.memberModel.findById(id).exec();
    // get number of borrowed books for the member to be returned
    const borrowedBooks = await this.borrowModel.find({ member: id }).exec();
    const borrowedBooksCount = borrowedBooks.reduce((acc, borrow) => {
      if (!borrow.returnDate) {
        acc++;
      }
      return acc;
    }, 0);
    return {
      ...book.toObject(),
      borrowedBooksCount,
    };
  }

  async update(id: number, updateMemberDto: UpdateMemberDto) {
    const book = await this.memberModel
      .findByIdAndUpdate(id, updateMemberDto)
      .exec();
    if (!book) {
      return null;
    }
    return book;
  }

  async remove(id: number) {
    const book = await this.memberModel.findByIdAndDelete(id).exec();
    if (!book) {
      return null;
    }
    return book;
  }
}
