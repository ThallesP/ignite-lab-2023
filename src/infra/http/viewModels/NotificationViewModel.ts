import { Notification } from './../../../application/entities/notification/Notification';
export class NotificationViewModel {
  static toHTTP(notification: Notification) {
    const { category, content, createdAt, id, readAt, recipientId } =
      notification;

    return {
      category,
      content: content.value,
      createdAt,
      id,
      readAt,
      recipientId,
    };
  }
}
