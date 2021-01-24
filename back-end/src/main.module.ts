import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  providers: [PrismaService],
  imports: [UserModule, AuthModule, ProfileModule],
})
export class MainModule {}
