import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';
import { ListModule } from './list/list.module';
import { TaskModule } from './task/task.module';

@Module({
  providers: [PrismaService],
  imports: [UserModule, AuthModule, ProfileModule, ListModule, TaskModule],
})
export class MainModule {}
