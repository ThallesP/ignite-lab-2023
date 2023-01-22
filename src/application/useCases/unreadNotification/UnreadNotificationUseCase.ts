import { Injectable } from '@nestjs/common';
import { NotificationNotFoundError } from '../../errors/NotificationNotFoundError';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';

export type UnreadNotificationInput = {
  id: string;
};

export type UnreadNotificationResponse = void;
@Injectable()
export class UnreadNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationsRepositoryContract,
  ) {}

  async execute(
    input: UnreadNotificationInput,
  ): Promise<UnreadNotificationResponse> {
    const { id } = input;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) throw new NotificationNotFoundError();

    notification.unread();

    await this.notificationsRepository.save(notification);
  }
}
