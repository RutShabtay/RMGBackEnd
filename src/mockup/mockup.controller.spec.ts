import { Test, TestingModule } from '@nestjs/testing';
import { MockupController } from './mockup.controller';

describe('MockupController', () => {
  let controller: MockupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MockupController],
    }).compile();

    controller = module.get<MockupController>(MockupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
