import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListController } from './list.controller';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [PrismaService, ListService],
  controllers: [ListController],
})
export class ListModule {}
