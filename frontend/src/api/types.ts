export type Response<T> = {
  statusCode: number;
  data?: T;
  message?: string;
  extra?: Record<keyof T, string[]>;
};

export type Country = {
  id: number;
  name: string;
};

export type Reservation = {
  id?: number;
  numberOfGuests: number;
  checkInDate: string;
  checkOutDate: string;
  firstName: string;
  lastName: string;
  billingAddress: string;
  billingCountry: number;
  postalCode: string;
  city: string;
  email: string;
  phoneNumber: string;
};

export type CountriesResponse = Response<Country[]>;
