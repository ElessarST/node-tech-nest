import { Country } from '../entities/country.entity';

export interface ICountryRepository {
  /**
   * Returns all countries
   */
  getAll(): Promise<Country[]>;

  /**
   * Returns country by id
   * @param id  country id
   */
  getById(id: number): Promise<Country>;
}

export const ICountryRepositoryToken = Symbol('ICountryRepository');
