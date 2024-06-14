import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Model } from 'mongoose';
import { Member } from './entities/member.entity';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_MODEL')
    private memberModel: Model<Member>,
  ) {}

  async create(createMemberDto: CreateMemberDto) {
    const createdBook = new this.memberModel(createMemberDto);
    return await createdBook.save();
  }

  async findAll() {
    return await this.memberModel.find().exec();
  }

  async findOne(id: number) {
    const book = await this.memberModel.findById(id).exec();
    if (!book) {
      return null;
    }
    return book;
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
