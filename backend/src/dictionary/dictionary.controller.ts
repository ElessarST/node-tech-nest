import { Controller, Get } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { CountryDto } from './models/country.dto';

@Controller('dictionary')
export class DictionaryController {
  constructor(private dictionaryService: DictionaryService) {}

  @Get('countries')
  async getCountries(): Promise<CountryDto[]> {
    return this.dictionaryService.getAllCountries();
  }
}
