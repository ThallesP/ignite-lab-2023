import { NotificationsRepositoryPrisma } from './prisma/repositories/NotificationsRepositoryPrisma';
import { PrismaService } from './prisma/PrismaService';
import { Module } from '@nestjs/common';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';

@Module({
  providers: [
    PrismaService,
    {
      provide: NotificationsRepositoryContract,
      useClass: NotificationsRepositoryPrisma,
    },
  ],
  exports: [NotificationsRepositoryContract],
})
export class DatabaseModule {}
