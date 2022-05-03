import { Inject, Injectable } from '@nestjs/common';
import { CountryDto } from './models/country.dto';
import {
  ICountryRepository,
  ICountryRepositoryToken,
} from '../core/repositories/country.repository';
import { toCountryDto } from './country.mappers';

@Injectable()
export class DictionaryService {
  constructor(
    @Inject(ICountryRepositoryToken)
    private readonly repository: ICountryRepository,
  ) {}

  async getAllCountries(): Promise<CountryDto[]> {
    return this.repository
      .getAll()
      .then((countries) => countries.map(toCountryDto));
  }
}
