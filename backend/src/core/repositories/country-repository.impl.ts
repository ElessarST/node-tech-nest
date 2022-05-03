import { ICountryRepository } from './country.repository';
import { Injectable } from '@nestjs/common';
import { Country } from '../entities/country.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CountryRepository implements ICountryRepository {
  constructor(
    @InjectRepository(Country)
    private readonly repository: Repository<Country>,
  ) {}

  async getAll(): Promise<Country[]> {
    return this.repository.find();
  }

  async getById(id: number): Promise<Country> {
    return this.repository.findOne({ where: { id } });
  }
}
