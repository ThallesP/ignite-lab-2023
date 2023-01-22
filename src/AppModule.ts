import { HttpModule } from './infra/http/HttpModule';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infra/database/DatabaseModule';

@Module({
  imports: [HttpModule, DatabaseModule],
})
export class AppModule {}
