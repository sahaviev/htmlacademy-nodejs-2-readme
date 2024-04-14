import { Module } from '@nestjs/common';

import { UserService } from 'libs/module/users/src/user.service';
import { UserRepository } from 'libs/module/users/src/user.repository';
import { UserFactory } from 'libs/module/users/src/user.factory';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'libs/module/users/src/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserModel.name, schema: UserSchema }
    ]),
  ],
  providers: [UserService, UserRepository, UserFactory],
  exports: [UserService],
})
export class UserModule {}
