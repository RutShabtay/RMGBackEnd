import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MockupModule } from './mockup/mockup.module';

@Module({
  imports: [MockupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
