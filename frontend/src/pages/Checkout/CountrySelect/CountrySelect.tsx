import { useData } from '../../../utils/useData';
import { getCountries } from '../../../api/api';
import { Select } from '../../../components/Select/Select';
import { FC, useCallback } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { FormControl } from '../../../components/FormControl/FormControl';
import { CheckoutFormFields } from '../CheckoutForm/types';

type Props = {
  errorMsg?: string;
  register: UseFormRegister<CheckoutFormFields>;
};

export const CountrySelect: FC<Props> = ({ register, errorMsg }) => {
  const getCountriesFn = useCallback(() => getCountries(), []);
  const { error, data, loading } = useData(getCountriesFn, []);
  if (error) {
    return (
      <FormControl labelText="Billing Country" required>
        <div className="error-msg">
          Failed to load countries list, please refresh the page
        </div>
      </FormControl>
    );
  }
  return (
    <Select
      labelText="Billing Country"
      required
      disabled={loading}
      errorMsg={errorMsg}
      {...register('billingCountry', { required: true, valueAsNumber: true })}
    >
      {data?.map((item) => (
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      ))}
    </Select>
  );
};
