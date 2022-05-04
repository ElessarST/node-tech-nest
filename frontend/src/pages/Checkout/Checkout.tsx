import './Checkout.css';
import { Divider } from '../../components/Divider/Divider';
import { CheckoutFormContainer } from './CheckoutForm/CheckoutFormContainer';
import { useState } from 'react';
import { Reservation } from '../../api/types';
import { CheckoutSuccess } from './CheckoutSuccess/CheckoutSuccess';

export const Checkout = () => {
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const showForm = !reservation;
  const showSuccess = !!reservation;
  return (
    <div className="checkout-container">
      {showForm && <h1>Book your suite at limehome</h1>}
      {showSuccess && (
        <h1>Your reservation #{reservation.id} was successfully created!</h1>
      )}
      <Divider />
      {showForm && (
        <CheckoutFormContainer
          onSuccess={(reservation) => setReservation(reservation)}
        />
      )}
      {showSuccess && (
        <CheckoutSuccess
          reservation={reservation}
          onCreateNew={() => setReservation(null)}
        />
      )}
    </div>
  );
};
