import axios from 'axios';
import { CountriesResponse, Country, Reservation, Response } from './types';

const API_BASE_URL = 'http://localhost:3001/';
const TIMEOUT = 30000;

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: TIMEOUT,
});

export function getCountries(): Promise<Country[]> {
  return instance
    .get<CountriesResponse>('/dictionary/countries')
    .then((res) => res.data.data || []);
}

export function saveReservation(
  request: Reservation,
): Promise<Reservation | null> {
  return instance
    .post<Response<Reservation>>('/reservations', request)
    .then((res) => res.data?.data || null);
}
