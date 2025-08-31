import { BadRequestException, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateFrameworkDto, UpdateFrameworkDto } from './dto/framework.dto';
import { Framework, Language } from '@prisma/client';

@Injectable()
export class FrameworkService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createFrameworkDto: CreateFrameworkDto) {
    const languages: string[] = createFrameworkDto.languages.split(', ');
    const languagesEntity: Language[] = [];

    const frameworkExist: Framework | null =
      await this.databaseService.framework.findFirst({
        where: {
          name: createFrameworkDto.name,
        },
      });

    if (frameworkExist != null)
      throw new BadRequestException('Framework already exist');

    for (const language of languages) {
      const isExist: Language | null =
        await this.databaseService.language.findFirst({
          where: {
            displayString: language,
          },
        });
      if (isExist == null) throw new BadRequestException('Invalid language');
      languagesEntity.push(isExist);
    }
    return this.databaseService.framework.create({
      data: {
        name: createFrameworkDto.name,
        LanguageOnFramework: {
          create: languagesEntity.map((entity) => ({
            Language: { connect: { id: entity.id } },
          })),
        },
      },
      include: {
        LanguageOnFramework: {
          include: { Language: true },
        },
      },
    });
  }

  async findAll() {
    return this.databaseService.framework.findMany();
  }

  async update(id: number, updateFrameworkDto: UpdateFrameworkDto) {
    return this.databaseService.framework.update({
      where: {
        id,
      },
      data: updateFrameworkDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.framework.delete({
      where: {
        id,
      },
    });
  }
}
