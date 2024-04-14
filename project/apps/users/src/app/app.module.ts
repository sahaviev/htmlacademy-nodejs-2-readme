import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserModule } from '@project/module/users';

import { UsersController } from 'apps/users/src/app/users.controller';

import { getMongooseOptions, UsersConfigModule } from '@project/config/users';

@Module({
  imports: [
    UserModule,
    UsersConfigModule,
    MongooseModule.forRootAsync(
      getMongooseOptions()
    ),
  ],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
