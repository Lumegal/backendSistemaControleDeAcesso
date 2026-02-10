import { Test, TestingModule } from '@nestjs/testing';
import { PlacaService } from './placa.service';

describe('PlacaService', () => {
  let service: PlacaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlacaService],
    }).compile();

    service = module.get<PlacaService>(PlacaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
