import { validateReservation } from './reservation.validator';
import { ReservationRequest } from './models/reservation.request';
import {
  CHECK_IN_BEFORE_OUT_ERROR,
  CHECK_IN_DATE_MIN_ERROR,
} from '../consts/reservationErrorMessages';
import { addDays } from 'date-fns';

describe('reservation validation', () => {
  it('should return error message if check in date before or today', () => {
    const now = new Date();
    expect(
      validateReservation({
        checkInDate: now,
      } as ReservationRequest),
    ).toBe(CHECK_IN_DATE_MIN_ERROR);
    expect(
      validateReservation({
        checkInDate: addDays(now, -1),
      } as ReservationRequest),
    ).toBe(CHECK_IN_DATE_MIN_ERROR);
  });
  it('should return error message if check in date after check out', () => {
    const date = new Date();
    expect(
      validateReservation({
        checkInDate: addDays(date, 2),
        checkOutDate: addDays(date, 1),
      } as ReservationRequest),
    ).toBe(CHECK_IN_BEFORE_OUT_ERROR);
    expect(
      validateReservation({
        checkInDate: addDays(date, 2),
        checkOutDate: addDays(date, 1),
      } as ReservationRequest),
    ).toBe(CHECK_IN_BEFORE_OUT_ERROR);
  });
  it('should return undefined if all checks are passed', () => {
    const date = new Date();
    expect(
      validateReservation({
        checkInDate: addDays(date, 1),
        checkOutDate: addDays(date, 2),
      } as ReservationRequest),
    ).toBeUndefined();
  });
});
