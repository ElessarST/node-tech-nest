export class ReservationDto {
  id: number;
  numberOfGuests: number;
  checkInDate: Date;
  checkOutDate: Date;
  firstName: string;
  lastName: string;
  billingAddress: string;
  billingCountry: string;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
}
