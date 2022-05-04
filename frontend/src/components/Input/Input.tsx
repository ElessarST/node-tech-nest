import { forwardRef, InputHTMLAttributes, useId } from 'react';
import './Input.css';
import { FormControl } from '../FormControl/FormControl';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  required?: boolean;
  errorMsg?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ labelText, required = false, errorMsg, ...props }, ref) => {
    const inputId = useId();
    return (
      <FormControl
        labelText={labelText}
        required={required}
        inputId={inputId}
        errorMsg={errorMsg}
      >
        <input
          ref={ref}
          className="input"
          id={inputId}
          required={required}
          placeholder={labelText}
          {...props}
        />
      </FormControl>
    );
  },
);
