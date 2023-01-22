import { randomUUID } from 'crypto';
import { NotificationsRepositoryInMemory } from '@test/repositories/inMemory/NotificationsRepositoryInMemory';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';
import { GetRecipientNotificationsUseCase } from './GetRecipientNotificationsUseCase';
import { makeNotification } from '../../../../test/factories/NotificationFactory';

let notificationsRepository: NotificationsRepositoryContract;
let getRecipientNotificationsUseCase: GetRecipientNotificationsUseCase;
describe('Get Recipient Notifications', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    getRecipientNotificationsUseCase = new GetRecipientNotificationsUseCase(
      notificationsRepository,
    );
  });

  it('should be able to get all notifications by recipient', async () => {
    const recipientId = randomUUID();
    await notificationsRepository.create(makeNotification({ recipientId }));

    await notificationsRepository.create(makeNotification({ recipientId }));

    await notificationsRepository.create(makeNotification());

    const { notifications } = await getRecipientNotificationsUseCase.execute({
      recipientId,
    });

    expect(notifications.length).toEqual(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});
