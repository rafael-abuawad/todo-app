import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';

@Module({
  providers: [PrismaService],
  imports: [UserModule],
})
export class MainModule {}
