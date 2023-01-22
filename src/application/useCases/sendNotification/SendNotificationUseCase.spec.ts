import { NotificationsRepositoryInMemory } from '@test/repositories/inMemory/NotificationsRepositoryInMemory';
import { randomUUID } from 'crypto';
import { NotificationsRepositoryContract } from '../../repositories/NotificationsRepositoryContract';
import { SendNotificationUseCase } from './SendNotificationUseCase';

let notificationsRepository: NotificationsRepositoryContract;
let sendNotificationUseCase: SendNotificationUseCase;
describe('Send Notification', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    sendNotificationUseCase = new SendNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to send a notification', async () => {
    const { notification } = await sendNotificationUseCase.execute({
      category: 'mail',
      content: 'you got mail',
      recipientId: randomUUID(),
    });

    const notificationExists = await notificationsRepository.findById(
      notification.id,
    );

    expect(notificationExists).toEqual(notification);
  });
});
