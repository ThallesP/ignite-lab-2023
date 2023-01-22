import { randomUUID } from 'crypto';
import { NotificationsRepositoryInMemory } from '@test/repositories/inMemory/NotificationsRepositoryInMemory';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';
import { CountRecipientNotificationsUseCase } from './CountRecipientNotificationsUseCase';
import { makeNotification } from '../../../../test/factories/NotificationFactory';

let notificationsRepository: NotificationsRepositoryContract;
let countRecipientNotificationsUseCase: CountRecipientNotificationsUseCase;
describe('Count Recipient Notifications', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    countRecipientNotificationsUseCase = new CountRecipientNotificationsUseCase(
      notificationsRepository,
    );
  });

  it('should be able to count recipient notifications', async () => {
    const recipientId = randomUUID();
    await notificationsRepository.create(makeNotification({ recipientId }));

    await notificationsRepository.create(makeNotification({ recipientId }));

    await notificationsRepository.create(makeNotification());

    const { count } = await countRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
