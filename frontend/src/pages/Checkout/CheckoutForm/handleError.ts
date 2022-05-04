import { AxiosError } from 'axios';
import { Reservation, Response } from '../../../api/types';
import { CheckoutFormFields } from './types';
import { UseFormSetError } from 'react-hook-form';

type SetErrorMessage = (message: string) => void;

function handleFieldValidationErrors(
  extra: Record<keyof Reservation, string[]>,
  setError: UseFormSetError<CheckoutFormFields>,
) {
  for (let field in extra) {
    const fieldKey = field as keyof CheckoutFormFields;
    setError(fieldKey, {
      message: extra[fieldKey][0],
    });
  }
}

function handleGeneralError(err: Error, setErrorMessage: SetErrorMessage) {
  setErrorMessage(err.message);
}

export function handleError(
  err: unknown,
  setError: UseFormSetError<CheckoutFormFields>,
  setErrorMessage: SetErrorMessage,
) {
  const responseData = (err as AxiosError<Response<Reservation>>)?.response
    ?.data;
  if (!responseData) {
    handleGeneralError(err as Error, setErrorMessage);
    return;
  }
  if (responseData.extra) {
    handleFieldValidationErrors(responseData.extra, setError);
    return;
  }
  setErrorMessage(responseData.message || '');
}
