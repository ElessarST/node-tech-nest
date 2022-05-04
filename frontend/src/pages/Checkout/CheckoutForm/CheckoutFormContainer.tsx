import { useForm } from 'react-hook-form';
import { CheckoutFormFields } from './types';
import { FC, useState } from 'react';
import { saveReservation } from '../../../api/api';
import { CheckoutForm } from './CheckoutForm';
import { formatDate } from '../../../utils/dateUtils';
import { handleError } from './handleError';
import { Reservation } from '../../../api/types';

type Props = {
  onSuccess: (reservation: Reservation) => void;
};

export const CheckoutFormContainer: FC<Props> = ({ onSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { isValid, errors, isSubmitting },
  } = useForm<CheckoutFormFields>({
    mode: 'onChange',
    defaultValues: {},
  });
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data: CheckoutFormFields) => {
    setErrorMessage('');
    try {
      const response = await saveReservation({
        ...data,
        checkInDate: formatDate(data.checkInDate),
        checkOutDate: formatDate(data.checkOutDate),
      });
      if (response) {
        onSuccess(response);
      } else {
        setErrorMessage('Failed to save reservation');
      }
    } catch (err) {
      handleError(err, setError, setErrorMessage);
    }
  };

  return (
    <CheckoutForm
      register={register}
      errorMessage={errorMessage}
      errors={errors}
      isValid={isValid}
      isSubmitting={isSubmitting}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};
