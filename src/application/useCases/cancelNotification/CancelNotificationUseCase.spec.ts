import { NotificationNotFoundError } from './../../errors/NotificationNotFoundError';
import { randomUUID } from 'crypto';
import { NotificationsRepositoryInMemory } from '@test/repositories/inMemory/NotificationsRepositoryInMemory';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';
import { CancelNotificationUseCase } from './CancelNotificationUseCase';
import { Notification } from '../../entities/notification/Notification';
import { Content } from '../../entities/notification/Content';
import { makeNotification } from '../../../../test/factories/NotificationFactory';

let notificationsRepository: NotificationsRepositoryContract;
let cancelNotificationUseCase: CancelNotificationUseCase;
describe('Cancel Notification', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    cancelNotificationUseCase = new CancelNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to cancel a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await cancelNotificationUseCase.execute({
      id: notification.id,
    });

    const canceledNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(canceledNotification?.canceledAt).toEqual(expect.any(Date));
  });

  it("shouldn't be able to cancel a notification that doesn't exists", async () => {
    await expect(async () => {
      await cancelNotificationUseCase.execute({
        id: randomUUID(),
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
