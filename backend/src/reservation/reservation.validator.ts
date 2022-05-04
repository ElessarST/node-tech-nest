import { differenceInCalendarDays } from 'date-fns';
import { ReservationRequest } from './models/reservation.request';
import {
  CHECK_IN_BEFORE_OUT_ERROR,
  CHECK_IN_DATE_MIN_ERROR,
} from '../consts/reservationErrorMessages';

const MIN_CHECK_IN_TODAY_DIFF = 1;
const MIN_CHECK_IN_OUT_DIFF = 1;

export function validateReservation(
  reservation: ReservationRequest,
): string | undefined {
  const today = new Date();
  if (
    differenceInCalendarDays(reservation.checkInDate, today) <
    MIN_CHECK_IN_TODAY_DIFF
  ) {
    return CHECK_IN_DATE_MIN_ERROR;
  }
  if (
    differenceInCalendarDays(
      reservation.checkOutDate,
      reservation.checkInDate,
    ) < MIN_CHECK_IN_OUT_DIFF
  ) {
    return CHECK_IN_BEFORE_OUT_ERROR;
  }
}
