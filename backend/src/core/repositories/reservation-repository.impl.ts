import { IReservationRepository } from './reservation.repository';
import { Reservation } from '../entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async getAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  async save(reservation: Reservation): Promise<Reservation> {
    return this.reservationRepository.save(reservation);
  }
}
