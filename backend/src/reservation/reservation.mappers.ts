import { ReservationRequest } from './models/reservation.request';
import { Country } from '../core/entities/country.entity';
import { Reservation } from '../core/entities/reservation.entity';
import { ReservationDto } from './models/reservation.dto';
import { formatDate } from '../utils/dateUtils';

export function createReservationEntity(
  request: ReservationRequest,
  billingCountry: Country,
): Omit<Reservation, 'id'> {
  return {
    billingAddress: request.billingAddress,
    billingCountry,
    checkInDate: request.checkInDate,
    checkOutDate: request.checkOutDate,
    city: request.city,
    email: request.email,
    firstName: request.firstName,
    lastName: request.lastName,
    numberOfGuests: request.numberOfGuests,
    phoneNumber: request.phoneNumber,
    postalCode: request.postalCode,
  };
}

export function toReservationDto(reservation: Reservation): ReservationDto {
  return {
    billingAddress: reservation.billingAddress,
    billingCountry: reservation.billingCountry.name,
    checkInDate: formatDate(reservation.checkInDate),
    checkOutDate: formatDate(reservation.checkOutDate),
    city: reservation.city,
    email: reservation.email,
    firstName: reservation.firstName,
    id: reservation.id,
    lastName: reservation.lastName,
    numberOfGuests: reservation.numberOfGuests,
    phoneNumber: reservation.phoneNumber,
    postalCode: reservation.postalCode,
  };
}
