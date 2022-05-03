import { Reservation } from '../entities/reservation.entity';

export interface IReservationRepository {
  /**
   * Returns all saved reservations
   */
  getAll(): Promise<Reservation[]>;
  /**
   * Save new reservation
   * @param reservation reservation entity
   */
  save(reservation: Omit<Reservation, 'id'>): Promise<Reservation>;
}

export const IReservationRepositoryToken = Symbol('IReservationRepository');
