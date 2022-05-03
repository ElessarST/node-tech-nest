import { ReservationRequest } from './models/reservation.request';
import {
  CHECK_IN_BEFORE_OUT_ERROR,
  CHECK_IN_DATE_MIN_ERROR,
} from '../consts/reservationErrorMessages';

export function validateReservation(
  reservation: ReservationRequest,
): string | undefined {
  const now = new Date();
  if (reservation.checkInDate < now.getTime()) {
    return CHECK_IN_DATE_MIN_ERROR;
  }
  if (reservation.checkOutDate <= reservation.checkInDate) {
    return CHECK_IN_BEFORE_OUT_ERROR;
  }
}
