import { Injectable } from '@nestjs/common';
import { CreateLanguageDto } from './dto/create-language.dto';
import { UpdateLanguageDto } from './dto/update-language.dto';
import { DatabaseService } from 'src/database/database.service';
import { Language } from 'generated/prisma';

@Injectable()
export class LanguageService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createLanguageDto: CreateLanguageDto) {
    const languages: Language[] = [];
    const displayStrings: string[] = createLanguageDto.displayStrings;

    for (const displayString of displayStrings) {
      const isExist = await this.databaseService.language.findMany({
        where: {
          displayString: displayString,
        },
      });

      if (isExist.length != 0) continue;

      const newLanguage = await this.databaseService.language.create({
        data: {
          displayString: displayString,
        },
      });
      languages.push(newLanguage);
    }

    return languages;
  }

  findAll() {
    return this.databaseService.language.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} language`;
  }

  update(id: number, updateLanguageDto: UpdateLanguageDto) {
    return `This action updates a #${id} language`;
  }

  remove(id: number) {
    return this.databaseService.language.delete({
      where: {
        id: id,
      },
    });
  }
}
