import { randomUUID } from 'crypto';
import { Content } from './Content';
import { Notification } from './Notification';

describe('NotificationContent', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('you got mail'),
      category: 'mail',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});
