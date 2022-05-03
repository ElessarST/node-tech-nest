import { Controller, Get } from '@nestjs/common';
import { Country } from '../core/entities/country.entity';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Get('countries')
  async getCountries(): Promise<Country[]> {
    return this.dictionaryService.getAllCountries();
  }
}
