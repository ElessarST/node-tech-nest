import { Country } from '../core/entities/country.entity';
import { CountryDto } from './models/country.dto';

export function toCountryDto(country: Country): CountryDto {
  return {
    id: country.id,
    name: country.name,
  };
}
