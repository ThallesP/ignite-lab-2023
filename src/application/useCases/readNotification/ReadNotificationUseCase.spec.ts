import { NotificationNotFoundError } from './../../errors/NotificationNotFoundError';
import { randomUUID } from 'crypto';
import { NotificationsRepositoryInMemory } from '@test/repositories/inMemory/NotificationsRepositoryInMemory';
import { NotificationsRepositoryContract } from '@application/repositories/NotificationsRepositoryContract';
import { ReadNotificationUseCase } from './ReadNotificationUseCase';
import { makeNotification } from '../../../../test/factories/NotificationFactory';

let notificationsRepository: NotificationsRepositoryContract;
let readNotificationUseCase: ReadNotificationUseCase;
describe('Read Notification', () => {
  beforeEach(() => {
    notificationsRepository = new NotificationsRepositoryInMemory();
    readNotificationUseCase = new ReadNotificationUseCase(
      notificationsRepository,
    );
  });

  it('should be able to read a notification', async () => {
    const notification = makeNotification();

    await notificationsRepository.create(notification);

    await readNotificationUseCase.execute({
      id: notification.id,
    });

    const readNotification = await notificationsRepository.findById(
      notification.id,
    );

    expect(readNotification?.readAt).toEqual(expect.any(Date));
  });

  it("shouldn't be able to read a notification that doesn't exists", async () => {
    await expect(async () => {
      await readNotificationUseCase.execute({
        id: randomUUID(),
      });
    }).rejects.toThrow(NotificationNotFoundError);
  });
});
