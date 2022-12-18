import { randomUUID } from 'crypto';
import { SendNotificationUseCase } from './SendNotificationUseCase';
let sendNotificationUseCase: SendNotificationUseCase;
describe('Send Notification', () => {
  beforeEach(() => {
    sendNotificationUseCase = new SendNotificationUseCase();
  });

  it('should be able to send a notification', async () => {
    const notification = await sendNotificationUseCase.execute({
      category: 'mail',
      content: 'you got mail',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
