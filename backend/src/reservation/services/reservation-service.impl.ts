import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ReservationRequest } from '../models/reservation.request';
import { validateReservation } from '../reservation.validator';
import { COUNTRY_NOT_FOUND_ERROR } from '../../consts/reservationErrorMessages';
import { ReservationDto } from '../models/reservation.dto';
import {
  toReservationDto,
  createReservationEntity,
} from '../reservation.mappers';
import {
  IReservationRepository,
  IReservationRepositoryToken,
} from '../../core/repositories/reservation.repository';
import {
  ICountryRepository,
  ICountryRepositoryToken,
} from '../../core/repositories/country.repository';
import { IReservationService } from './reservation.service';

@Injectable()
export class ReservationService implements IReservationService {
  constructor(
    @Inject(IReservationRepositoryToken)
    private readonly reservationRepository: IReservationRepository,
    @Inject(ICountryRepositoryToken)
    private readonly countryRepository: ICountryRepository,
  ) {}

  async getAll(): Promise<ReservationDto[]> {
    return this.reservationRepository
      .getAll()
      .then((reservations) => reservations.map(toReservationDto));
  }

  async saveReservation(
    reservationReq: ReservationRequest,
  ): Promise<ReservationDto> {
    const validationMsg = validateReservation(reservationReq);
    if (validationMsg) {
      throw new BadRequestException(validationMsg);
    }
    const billingCountry = await this.countryRepository.getById(
      reservationReq.billingCountryId,
    );
    if (!billingCountry) {
      throw new BadRequestException(COUNTRY_NOT_FOUND_ERROR);
    }
    const reservationEntity = createReservationEntity(
      reservationReq,
      billingCountry,
    );
    await this.reservationRepository.save(reservationEntity);
    return this.reservationRepository
      .save(reservationEntity)
      .then((entity) =>
        toReservationDto({ ...reservationEntity, id: entity.id }),
      );
  }
}
