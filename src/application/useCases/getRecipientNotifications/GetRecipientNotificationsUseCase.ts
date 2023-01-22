import { Notification } from '@application/entities/notification/Notification';
import { Injectable } from '@nestjs/common';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';

export type GetRecipientNotificationsInput = {
  recipientId: string;
};

export type GetRecipientNotificationsResponse = {
  notifications: Notification[];
};

@Injectable()
export class GetRecipientNotificationsUseCase {
  constructor(
    private notificationsRepository: NotificationsRepositoryContract,
  ) {}

  async execute(
    input: GetRecipientNotificationsInput,
  ): Promise<GetRecipientNotificationsResponse> {
    const { recipientId } = input;

    const notifications =
      await this.notificationsRepository.findAllByRecipientId(recipientId);

    return { notifications };
  }
}
