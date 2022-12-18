import { Content } from '../../entities/notification/Content';
import { Notification } from '../../entities/notification/Notification';

export type SendNotificationInput = {
  recipientId: string;
  content: string;
  category: string;
};

export type SendNotificationResponse = {
  notification: Notification;
};

export class SendNotificationUseCase {
  async execute(
    input: SendNotificationInput,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = input;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    return { notification };
  }
}
