import { Module } from '@nestjs/common';
import { MockupController } from './mockup.controller';
import { MockupService } from './mockup.service';

@Module({
  controllers: [MockupController],
  providers: [MockupService],
  exports: [MockupService],
})
export class MockupModule {}
