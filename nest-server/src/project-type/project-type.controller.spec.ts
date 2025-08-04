import { Test, TestingModule } from '@nestjs/testing';
import { ProjectTypeController } from './project-type.controller';
import { ProjectTypeService } from './project-type.service';

describe('ProjectTypeController', () => {
  let controller: ProjectTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectTypeController],
      providers: [ProjectTypeService],
    }).compile();

    controller = module.get<ProjectTypeController>(ProjectTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
