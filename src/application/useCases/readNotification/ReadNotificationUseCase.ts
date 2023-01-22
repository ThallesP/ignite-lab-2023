import { Notification } from '@application/entities/notification/Notification';
import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../../errors/NotificationNotFoundError';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';

export type ReadNotificationInput = {
  id: string;
};

export type ReadNotificationResponse = void;
@Injectable()
export class ReadNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationsRepositoryContract,
  ) {}

  async execute(
    input: ReadNotificationInput,
  ): Promise<ReadNotificationResponse> {
    const { id } = input;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) throw new NotificationNotFoundError();

    notification.read();

    await this.notificationsRepository.save(notification);
  }
}
