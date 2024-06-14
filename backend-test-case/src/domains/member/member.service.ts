import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Model } from 'mongoose';
import { Book } from '../book/entities/book.interface';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_MODEL')
    private bookModel: Model<Book>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const createdBook = new this.bookModel(createMemberDto);
    return createdBook.save();
  }

  async findAll() {
    return this.bookModel.find().exec();
  }

  findOne(id: number) {
    const book = this.bookModel.findById(id).exec();
    if (!book) {
      return null;
    }
    return book;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    const book = this.bookModel.findByIdAndUpdate(id, updateMemberDto).exec();
    if (!book) {
      return null;
    }
    return book;
  }

  remove(id: number) {
    const book = this.bookModel.findByIdAndDelete(id).exec();
    if (!book) {
      return null;
    }
    return book;
  }
}
