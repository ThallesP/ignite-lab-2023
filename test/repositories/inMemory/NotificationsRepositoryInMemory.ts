import { Notification } from '@application/entities/notification/Notification';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';

export class NotificationsRepositoryInMemory
  implements NotificationsRepositoryContract
{
  private notifications: Notification[] = [];

  async findAllByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((n) => n.recipientId === recipientId);
  }

  async countAllByRecipientId(recipientId: string): Promise<number> {
    return this.notifications.filter((n) => n.recipientId === recipientId)
      .length;
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (n) => n.id === notification.id,
    );

    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = this.notifications.find((n) => n.id === id);

    if (!notification) return null;

    return notification;
  }

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
