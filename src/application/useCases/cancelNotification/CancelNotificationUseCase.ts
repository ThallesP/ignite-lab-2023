import { NotificationNotFoundError } from './../../errors/NotificationNotFoundError';
import { Injectable } from '@nestjs/common';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';

export type CancelNotificationInput = {
  id: string;
};

export type CancelNotificationResponse = void;

@Injectable()
export class CancelNotificationUseCase {
  constructor(
    private notificationsRepository: NotificationsRepositoryContract,
  ) {}

  async execute(
    input: CancelNotificationInput,
  ): Promise<CancelNotificationResponse> {
    const { id } = input;

    const notification = await this.notificationsRepository.findById(id);

    if (!notification) throw new NotificationNotFoundError();

    notification.cancel();
  }
}
