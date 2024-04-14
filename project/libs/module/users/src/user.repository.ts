import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { BaseMongoRepository } from '@project/shared/data-access';

import { UserEntity } from './user.entity';
import { UserFactory } from './user.factory';
import { UserModel } from './user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository extends BaseMongoRepository<UserEntity, UserModel> {
  constructor(
    entityFactory: UserFactory,
    @InjectModel(UserModel.name) blogUserModel: Model<UserModel>
  ) {
    super(entityFactory, blogUserModel);
  }

  public async findByEmail(email: string): Promise<UserEntity | null> {
    const document = await this.model.findOne({ email }).exec();
    return this.createEntityFromDocument(document);
  }
}
