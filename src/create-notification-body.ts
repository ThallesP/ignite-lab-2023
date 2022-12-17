import { IsNotEmpty, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  @IsNotEmpty()
  recipientId: string;
}
