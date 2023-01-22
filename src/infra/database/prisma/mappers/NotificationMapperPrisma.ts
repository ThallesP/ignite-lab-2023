import { Notification } from './../../../../application/entities/notification/Notification';
import { Notification as NotificationPrisma } from '@prisma/client';
import { Content } from '../../../../application/entities/notification/Content';
export class NotificationMapperPrisma {
  static toPersistence(notification: Notification) {
    return {
      category: notification.category,
      content: notification.content.value,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      id: notification.id,
    };
  }

  static fromPersistence(notification: NotificationPrisma): Notification {
    return new Notification(
      {
        category: notification.category,
        content: new Content(notification.content),
        recipientId: notification.recipientId,
        readAt: notification.readAt,
        createdAt: notification.createdAt,
        canceledAt: notification.canceledAt,
      },
      notification.id,
    );
  }
}
