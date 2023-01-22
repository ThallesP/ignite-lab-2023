import { GetRecipientNotificationsUseCase } from './../../application/useCases/getRecipientNotifications/GetRecipientNotificationsUseCase';
import { CountRecipientNotificationsUseCase } from './../../application/useCases/countRecipientNotifications/CountRecipientNotificationsUseCase';
import { ReadNotificationUseCase } from './../../application/useCases/readNotification/ReadNotificationUseCase';
import { CancelNotificationUseCase } from './../../application/useCases/cancelNotification/CancelNotificationUseCase';
import { SendNotificationUseCase } from '@application/useCases/sendNotification/SendNotificationUseCase';
import { NotificationsController } from './controllers/NotificationsController';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/DatabaseModule';
import { UnreadNotificationUseCase } from '../../application/useCases/unreadNotification/UnreadNotificationUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotificationUseCase,
    CancelNotificationUseCase,
    ReadNotificationUseCase,
    CountRecipientNotificationsUseCase,
    GetRecipientNotificationsUseCase,
    UnreadNotificationUseCase,
  ],
})
export class HttpModule {}
