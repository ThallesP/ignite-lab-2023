import { Injectable } from '@nestjs/common';
import { Content } from '../../entities/notification/Content';
import { Notification } from '../../entities/notification/Notification';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';

export type SendNotificationInput = {
  recipientId: string;
  content: string;
  category: string;
};

export type SendNotificationResponse = {
  notification: Notification;
};

@Injectable()
export class SendNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationsRepositoryContract,
  ) {}

  async execute(
    input: SendNotificationInput,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = input;

    const notification = new Notification({
      category,
      content: new Content(content),
      recipientId,
    });

    await this.notificationsRepository.create(notification);

    return { notification };
  }
}
