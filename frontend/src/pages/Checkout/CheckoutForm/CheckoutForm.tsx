import { UseFormRegister } from 'react-hook-form';
import { Input } from '../../../components/Input/Input';
import './CheckoutForm.css';
import { Button } from '../../../components/Button/Button';
import { CountrySelect } from '../CountrySelect/CountrySelect';
import { CheckoutFormFields } from './types';
import { FC, useMemo } from 'react';
import { FieldErrors } from 'react-hook-form/dist/types/errors';
import { addDays } from 'date-fns';
import { formatDate } from '../../../utils/dateUtils';

type Props = {
  isValid: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  errors: FieldErrors<CheckoutFormFields>;
  register: UseFormRegister<CheckoutFormFields>;
  onSubmit: () => void;
};

export const CheckoutForm: FC<Props> = ({
  isSubmitting,
  register,
  errorMessage,
  isValid,
  errors,
  onSubmit,
}) => {
  const minDate = useMemo(() => formatDate(addDays(new Date(), 1)), []);

  return (
    <form onSubmit={onSubmit}>
      <div className="form-row">
        <Input
          labelText="Check-in date"
          type="date"
          required
          min={minDate}
          errorMsg={errors?.checkInDate?.message}
          {...register('checkInDate', { required: true, valueAsDate: true })}
        />
        <Input
          labelText="Check-out date"
          type="date"
          required
          min={minDate}
          errorMsg={errors?.checkOutDate?.message}
          {...register('checkOutDate', { required: true, valueAsDate: true })}
        />
      </div>
      <div className="form-row">
        <Input
          labelText="First Name"
          required
          errorMsg={errors?.firstName?.message}
          {...register('firstName', { required: true })}
        />
        <Input
          labelText="Last Name"
          required
          errorMsg={errors?.lastName?.message}
          {...register('lastName', { required: true })}
        />
      </div>
      <div className="form-row">
        <Input
          labelText="Billing Address"
          required
          errorMsg={errors?.billingAddress?.message}
          {...register('billingAddress', { required: true })}
        />
        <CountrySelect
          register={register}
          errorMsg={errors?.billingCountry?.message}
        />
      </div>
      <div className="form-row">
        <Input
          labelText="Postal Code"
          required
          errorMsg={errors?.postalCode?.message}
          {...register('postalCode', { required: true })}
        />
        <Input
          labelText="City"
          required
          errorMsg={errors?.city?.message}
          {...register('city', { required: true })}
        />
      </div>
      <div className="form-row">
        <Input
          labelText="Email"
          required
          errorMsg={errors?.email?.message}
          {...register('email', { required: true })}
        />
        <Input
          labelText="Phone Number"
          required
          errorMsg={errors?.phoneNumber?.message}
          {...register('phoneNumber', { required: true })}
        />
      </div>
      <div className="form-row">
        <Input
          labelText="Number of guests"
          type="number"
          min="1"
          required
          errorMsg={errors?.numberOfGuests?.message}
          {...register('numberOfGuests', {
            required: true,
            valueAsNumber: true,
          })}
        />
        <div />
      </div>
      <Button disabled={!isValid || isSubmitting} type="submit">
        Book Now
      </Button>
      {errorMessage && <div className="error-msg">{errorMessage}</div>}
    </form>
  );
};
