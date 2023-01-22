import { NotificationMapperPrisma } from './../mappers/NotificationMapperPrisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from './../PrismaService';
import { Notification } from '@application/entities/notification/Notification';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';
import { Content } from '@application/entities/notification/Content';

@Injectable()
export class NotificationsRepositoryPrisma
  implements NotificationsRepositoryContract
{
  constructor(private prisma: PrismaService) {}

  async countAllByRecipientId(recipientId: string): Promise<number> {
    return this.prisma.notification.count({ where: { recipientId } });
  }

  async findAllByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prisma.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(NotificationMapperPrisma.fromPersistence);
  }

  async save(notification: Notification): Promise<void> {
    const persistence = NotificationMapperPrisma.toPersistence(notification);

    await this.prisma.notification.update({
      data: persistence,
      where: { id: persistence.id },
    });
  }

  async create(notification: Notification): Promise<void> {
    const persistence = NotificationMapperPrisma.toPersistence(notification);

    await this.prisma.notification.create({
      data: persistence,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notification) return null;

    return NotificationMapperPrisma.fromPersistence(notification);
  }
}
