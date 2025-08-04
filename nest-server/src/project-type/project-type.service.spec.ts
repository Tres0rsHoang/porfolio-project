import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTypeService } from './project-type.service';

describe('ProjectTypeService', () => {
  let service: ProjectTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectTypeService],
    }).compile();

    service = module.get<ProjectTypeService>(ProjectTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
