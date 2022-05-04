import { IsEmail, IsNotEmpty, IsPhoneNumber, Min } from 'class-validator';
import {
  BILLING_ADDRESS_REQUIRED_ERROR,
  BILLING_COUNTRY_REQUIRED_ERROR,
  CHECK_IN_DATE_REQUIRED_ERROR,
  CHECK_OUT_DATE_REQUIRED_ERROR,
  CITY_REQUIRED_ERROR,
  EMAIL_NOT_VALID_ERROR,
  EMAIL_REQUIRED_ERROR,
  FIRST_NAME_REQUIRED_ERROR,
  LAST_NAME_REQUIRED_ERROR,
  NUMBER_OF_GUESTS_MIN_ERROR,
  PHONE_NUMBER_NOT_VALID_ERROR,
  PHONE_NUMBER_REQUIRED_ERROR,
  POSTAL_CODE_REQUIRED_ERROR,
} from '../../consts/reservationErrorMessages';
import { Transform } from 'class-transformer';
import { parseDate } from '../../utils/dateUtils';

export class ReservationRequest {
  @IsNotEmpty({ message: NUMBER_OF_GUESTS_MIN_ERROR })
  @Min(1, { message: NUMBER_OF_GUESTS_MIN_ERROR })
  numberOfGuests: number;

  @IsNotEmpty({ message: CHECK_IN_DATE_REQUIRED_ERROR })
  @Transform((params) => parseDate(params.value))
  checkInDate: Date;

  @IsNotEmpty({ message: CHECK_OUT_DATE_REQUIRED_ERROR })
  @Transform((params) => parseDate(params.value))
  checkOutDate: Date;

  @IsNotEmpty({ message: FIRST_NAME_REQUIRED_ERROR })
  firstName: string;

  @IsNotEmpty({ message: LAST_NAME_REQUIRED_ERROR })
  lastName: string;

  @IsNotEmpty({ message: BILLING_ADDRESS_REQUIRED_ERROR })
  billingAddress: string;

  @IsNotEmpty({ message: BILLING_COUNTRY_REQUIRED_ERROR })
  billingCountryId: number;

  @IsNotEmpty({ message: POSTAL_CODE_REQUIRED_ERROR })
  postalCode: string;

  @IsNotEmpty({ message: CITY_REQUIRED_ERROR })
  city: string;

  @IsNotEmpty({ message: EMAIL_REQUIRED_ERROR })
  @IsEmail({ message: EMAIL_NOT_VALID_ERROR })
  email: string;

  @IsNotEmpty({ message: PHONE_NUMBER_REQUIRED_ERROR })
  @IsPhoneNumber(undefined, { message: PHONE_NUMBER_NOT_VALID_ERROR })
  phoneNumber: string;
}
