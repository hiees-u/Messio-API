import { Test, TestingModule } from '@nestjs/testing';
import { FacebooksController } from './facebooks.controller';

describe('FacebooksController', () => {
  let controller: FacebooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacebooksController],
    }).compile();

    controller = module.get<FacebooksController>(FacebooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
