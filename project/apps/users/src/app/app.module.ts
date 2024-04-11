import { Module } from '@nestjs/common';

import { UsersModule } from '@project/module/users';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
