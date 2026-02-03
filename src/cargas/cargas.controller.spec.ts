import { Test, TestingModule } from '@nestjs/testing';
import { CargasController } from './cargas.controller';
import { CargasService } from './cargas.service';

describe('CargasController', () => {
  let controller: CargasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CargasController],
      providers: [CargasService],
    }).compile();

    controller = module.get<CargasController>(CargasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
