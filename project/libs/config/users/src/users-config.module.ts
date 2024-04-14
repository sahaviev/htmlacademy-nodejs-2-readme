import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import applicationConfig from './configurations/application.config';
import mongoConfig from './configurations/mongo.config';

const ENV_USERS_FILE_PATH = 'apps/users/users.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [applicationConfig, mongoConfig],
      envFilePath: ENV_USERS_FILE_PATH
    }),
  ]
})
export class UsersConfigModule {}
