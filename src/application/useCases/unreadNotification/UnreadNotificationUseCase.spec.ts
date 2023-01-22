import { NotificationNotFoundError } from './../../errors/NotificationNotFoundError';
import { randomUUID } from 'crypto';
import { NotificationsRepositoryInMemory } from '@test/repositories/inMemory/NotificationsRepositoryInMemory';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';
import { UnreadNotificationUseCase } from './UnreadNotificationUseCase';
import { makeNotification } from '../../../../test/factories/NotificationFactory';

let notificationsRepository: NotificationsRepositoryContract;
let unreadNotificationUseCase: UnreadNotificationUseCase;
describe('Unread Notification', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    unreadNotificationUseCase = new UnreadNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to unread a notification', async () => {
    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationsRepository.create(notification);

    await unreadNotificationUseCase.execute({
      id: notification.id,
    });

    const unreadNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(unreadNotification?.readAt).toBeNull();
  });

  it("shouldn't be able to unread a notification that doesn't exists", async () => {
    await expect(async () => {
      await unreadNotificationUseCase.execute({
        id: randomUUID(),
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
