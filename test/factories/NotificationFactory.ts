import { randomUUID } from 'crypto';
import { Content } from '../../src/application/entities/notification/Content';
import {
  Notification,
  NotificationProps,
} from '../../src/application/entities/notification/Notification';

export function makeNotification(override: Partial<NotificationProps> = {}) {
  return new Notification({
    category: 'mail',
    content: new Content('you got mail'),
    recipientId: randomUUID(),
    ...override,
  });
}
