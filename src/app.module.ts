import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ListModule } from './list/list.module';

@Module({
  imports: [UserModule, AuthModule, ListModule],
})
export class AppModule {}
