import { Test, TestingModule } from '@nestjs/testing';
import { CargasService } from './cargas.service';

describe('CargasService', () => {
  let service: CargasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CargasService],
    }).compile();

    service = module.get<CargasService>(CargasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
