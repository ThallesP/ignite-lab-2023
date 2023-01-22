import { Notification } from '../entities/notification/Notification';

export abstract class NotificationsRepositoryContract {
  abstract create(notification: Notification): Promise<void>;

  abstract findById(id: string): Promise<Notification | null>;

  abstract save(notification: Notification): Promise<void>;

  abstract countAllByRecipientId(recipientId: string): Promise<number>;

  abstract findAllByRecipientId(recipientId: string): Promise<Notification[]>;
}
