import { validateReservation } from './reservation.validator';
import { ReservationRequest } from './models/reservation.request';
import {
  CHECK_IN_BEFORE_OUT_ERROR,
  CHECK_IN_DATE_MIN_ERROR,
} from '../consts/reservationErrorMessages';

describe('reservation validation', () => {
  it('should return error message if check in date before now', () => {
    expect(
      validateReservation({
        checkInDate: new Date().getTime() - 10000,
      } as ReservationRequest),
    ).toBe(CHECK_IN_DATE_MIN_ERROR);
    expect(
      validateReservation({
        checkInDate: new Date().getTime() - 1,
      } as ReservationRequest),
    ).toBe(CHECK_IN_DATE_MIN_ERROR);
  });
  it('should return error message if check in date after check out', () => {
    const date = new Date().getTime() + 60000;
    expect(
      validateReservation({
        checkOutDate: date,
        checkInDate: date + 1000,
      } as ReservationRequest),
    ).toBe(CHECK_IN_BEFORE_OUT_ERROR);
    expect(
      validateReservation({
        checkOutDate: date,
        checkInDate: date,
      } as ReservationRequest),
    ).toBe(CHECK_IN_BEFORE_OUT_ERROR);
  });
  it('should return undefined if all checks are passed', () => {
    const date = new Date().getTime() + 60000;
    expect(
      validateReservation({
        checkInDate: date,
        checkOutDate: date + 1000,
      } as ReservationRequest),
    ).toBeUndefined();
  });
});
