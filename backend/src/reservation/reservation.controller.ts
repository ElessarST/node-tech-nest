import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { ReservationRequest } from './models/reservation.request';
import { ReservationDto } from './models/reservation.dto';
import {
  IReservationService,
  IReservationServiceToken,
} from './services/reservation.service';

@Controller('reservations')
export class ReservationController {
  constructor(
    @Inject(IReservationServiceToken)
    private readonly reservationService: IReservationService,
  ) {}

  @Get()
  async getAllReservations(): Promise<ReservationDto[]> {
    return this.reservationService.getAll();
  }

  @Post()
  async saveReservation(
    @Body() reservation: ReservationRequest,
  ): Promise<ReservationDto> {
    return this.reservationService.saveReservation(reservation);
  }
}
