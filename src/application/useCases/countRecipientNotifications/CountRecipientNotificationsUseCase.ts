import { Injectable } from '@nestjs/common';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';

export type CountRecipientNotificationsInput = {
  recipientId: string;
};

export type CountRecipientNotificationsResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotificationsUseCase {
  constructor(
    private notificationsRepository: NotificationsRepositoryContract,
  ) {}

  async execute(
    input: CountRecipientNotificationsInput,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = input;

    const count = await this.notificationsRepository.countAllByRecipientId(
      recipientId,
    );

    return { count };
  }
}
