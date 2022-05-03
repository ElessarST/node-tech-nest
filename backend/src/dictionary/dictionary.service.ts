import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Country } from '../core/entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DictionaryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async getAllCountries(): Promise<Country[]> {
    return this.countryRepository.find();
  }
}
