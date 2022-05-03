import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Reservation } from './entities/reservation.entity';
import { getConnectionOptions } from 'typeorm';
import { CountryRepository } from './repositories/country-repository.impl';
import { ICountryRepositoryToken } from './repositories/country.repository';
import { IReservationRepositoryToken } from './repositories/reservation.repository';
import { ReservationRepository } from './repositories/reservation-repository.impl';

export const countryRepositoryProvider = {
  provide: ICountryRepositoryToken,
  useExisting: CountryRepository,
};

export const reservationRepositoryProvider = {
  provide: IReservationRepositoryToken,
  useExisting: ReservationRepository,
};

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          migrations: [],
          autoLoadEntities: true,
        }),
    }),
    TypeOrmModule.forFeature([Country, Reservation]),
  ],
  providers: [
    CountryRepository,
    countryRepositoryProvider,
    ReservationRepository,
    reservationRepositoryProvider,
  ],
  exports: [countryRepositoryProvider, reservationRepositoryProvider],
})
export class CoreModule {}
