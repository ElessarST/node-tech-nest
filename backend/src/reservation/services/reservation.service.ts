import { ReservationDto } from '../models/reservation.dto';
import { ReservationRequest } from '../models/reservation.request';

export interface IReservationService {
  getAll(): Promise<ReservationDto[]>;
  saveReservation(reservationReq: ReservationRequest): Promise<ReservationDto>;
}

export const IReservationServiceToken = Symbol('IReservationService');
