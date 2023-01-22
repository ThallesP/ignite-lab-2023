import { CountRecipientNotificationsUseCase } from './../../../application/useCases/countRecipientNotifications/CountRecipientNotificationsUseCase';
import { UnreadNotificationUseCase } from './../../../application/useCases/unreadNotification/UnreadNotificationUseCase';
import { ReadNotificationUseCase } from './../../../application/useCases/readNotification/ReadNotificationUseCase';
import { SendNotificationUseCase } from '@application/useCases/sendNotification/SendNotificationUseCase';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CancelNotificationUseCase } from '../../../application/useCases/cancelNotification/CancelNotificationUseCase';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../viewModels/NotificationViewModel';
import { GetRecipientNotificationsUseCase } from '../../../application/useCases/getRecipientNotifications/GetRecipientNotificationsUseCase';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotificationUseCase: SendNotificationUseCase,
    private cancelNotificationUseCase: CancelNotificationUseCase,
    private readNotificationUseCase: ReadNotificationUseCase,
    private unreadNotifiction: UnreadNotificationUseCase,
    private countRecipientNotifications: CountRecipientNotificationsUseCase,
    private getRecipientNotifications: GetRecipientNotificationsUseCase,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotificationUseCase.execute({ id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotificationUseCase.execute({ id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotifiction.execute({ id });
  }

  @Get('count/from/:recipientId')
  async countAllRecipientNotifications(
    @Param('recipientId') recipientId: string,
  ) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

  @Get('from/:recipientId')
  async getAllRecipientNotifications(
    @Param('recipientId') recipientId: string,
  ) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotificationUseCase.execute({
      category,
      content,
      recipientId,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
