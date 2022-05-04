import { ICountryRepository } from '../../core/repositories/country.repository';
import { IReservationRepository } from '../../core/repositories/reservation.repository';
import { ReservationService } from './reservation-service.impl';
import * as validation from '../reservation.validator';
import { ReservationRequest } from '../models/reservation.request';
import { BadRequestException } from '@nestjs/common';
import { COUNTRY_NOT_FOUND_ERROR } from '../../consts/reservationErrorMessages';
import { createReservationEntity } from '../reservation.mappers';

function createCountryRepositoryMock(
  overrides: Partial<ICountryRepository> = {},
): ICountryRepository {
  return {
    getAll: jest.fn(),
    getById: jest.fn(),
    ...overrides,
  };
}

function createReservationRepositoryMock(
  overrides: Partial<IReservationRepository> = {},
): IReservationRepository {
  return {
    getAll: jest.fn(),
    save: jest.fn(),
    ...overrides,
  };
}

const country = { id: 1, name: 'Germany' };

const request: ReservationRequest = {
  numberOfGuests: 2,
  checkInDate: new Date(),
  checkOutDate: new Date(),
  firstName: 'First',
  lastName: 'Last',
  billingAddress: 'Billing',
  billingCountryId: 5,
  postalCode: '1234',
  city: 'Berlin',
  email: 'email@gmail.com',
  phoneNumber: '+11111111',
};

describe('ReservationService', () => {
  describe('saveReservation', () => {
    it('should call validateReservation', async () => {
      const validateReservationFn = jest.spyOn(
        validation,
        'validateReservation',
      );
      const service = new ReservationService(
        createReservationRepositoryMock(),
        createCountryRepositoryMock(),
      );
      try {
        await service.saveReservation(request);
      } catch (err) {}
      expect(validateReservationFn).toHaveBeenCalled();
    });
    it('should throw exception with validation error if validation failed', async () => {
      const errorMessage = 'errorMessage';
      jest
        .spyOn(validation, 'validateReservation')
        .mockReturnValue(errorMessage);
      const service = new ReservationService(
        createReservationRepositoryMock(),
        createCountryRepositoryMock(),
      );
      await expect(() => service.saveReservation(request)).rejects.toThrowError(
        new BadRequestException(errorMessage),
      );
    });
    it('should throw exception if country not found', async () => {
      jest.spyOn(validation, 'validateReservation').mockReturnValue('');
      const getById = jest.fn().mockReturnValue(null);
      const service = new ReservationService(
        createReservationRepositoryMock(),
        createCountryRepositoryMock({ getById }),
      );
      await expect(() => service.saveReservation(request)).rejects.toThrowError(
        new BadRequestException(COUNTRY_NOT_FOUND_ERROR),
      );
    });
    it('should call save if all checks are passed', async () => {
      jest.spyOn(validation, 'validateReservation').mockReturnValue('');
      const getById = jest.fn().mockReturnValue(country);
      const entity = createReservationEntity(request, country);
      const save = jest.fn().mockResolvedValue(entity);
      const service = new ReservationService(
        createReservationRepositoryMock({ save }),
        createCountryRepositoryMock({ getById }),
      );
      await service.saveReservation(request);
      expect(save).toHaveBeenCalledWith(entity);
    });
  });
});
