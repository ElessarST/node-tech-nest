import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller';
import { CoreModule } from '../core/core.module';
import { ReservationService } from './services/reservation-service.impl';
import { IReservationServiceToken } from './services/reservation.service';

const reservationServiceProvider = {
  provide: IReservationServiceToken,
  useExisting: ReservationService,
};

@Module({
  imports: [CoreModule],
  controllers: [ReservationController],
  providers: [ReservationService, reservationServiceProvider],
})
export class ReservationModule {}
