import { Test, TestingModule } from '@nestjs/testing';
import { PlacaController } from './placa.controller';
import { PlacaService } from './placa.service';

describe('PlacaController', () => {
  let controller: PlacaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlacaController],
      providers: [PlacaService],
    }).compile();

    controller = module.get<PlacaController>(PlacaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
