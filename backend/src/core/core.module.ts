import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Reservation } from './entities/reservation.entity';
import { getConnectionOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          migrations: [],
          autoLoadEntities: true,
          entities: [Country, Reservation],
        }),
    }),
  ],
  exports: [],
})
export class CoreModule {}
