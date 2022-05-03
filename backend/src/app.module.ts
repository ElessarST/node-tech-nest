import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ReservationModule } from './reservation/reservation.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [CoreModule, ReservationModule, DictionaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
