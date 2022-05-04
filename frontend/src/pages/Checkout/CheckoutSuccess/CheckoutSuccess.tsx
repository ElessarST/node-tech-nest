import { FC } from 'react';
import { Reservation } from '../../../api/types';
import { Button } from '../../../components/Button/Button';
import { formatDateForUser } from '../../../utils/dateUtils';
import './CheckoutSuccess.css';

type Props = {
  reservation: Reservation;
  onCreateNew: () => void;
};

export const CheckoutSuccess: FC<Props> = ({ reservation, onCreateNew }) => (
  <div>
    <h2>Reservation details:</h2>
    <p>
      Dates: {formatDateForUser(reservation.checkInDate)}/
      {formatDateForUser(reservation.checkOutDate)}
    </p>
    <p>
      Guests: {reservation.firstName} {reservation.lastName} (
      {reservation.numberOfGuests} guests)
    </p>
    <p>Contact Email: {reservation.email}</p>
    <p>Contact Phone: {reservation.phoneNumber}</p>
    <div className="new-reservation-btn">
      <Button onClick={onCreateNew}>Create New Reservation</Button>
    </div>
  </div>
);
