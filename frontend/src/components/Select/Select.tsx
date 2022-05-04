import {
  forwardRef,
  SelectHTMLAttributes,
  useId,
  PropsWithChildren,
} from 'react';
import './Select.css';
import { FormControl } from '../FormControl/FormControl';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  labelText: string;
  required?: boolean;
  errorMsg?: string;
}

export const Select = forwardRef<HTMLSelectElement, PropsWithChildren<Props>>(
  ({ labelText, errorMsg, required = false, children, ...props }, ref) => {
    const inputId = useId();
    return (
      <FormControl
        labelText={labelText}
        required={required}
        inputId={inputId}
        errorMsg={errorMsg}
      >
        <select
          ref={ref}
          className="select"
          id={inputId}
          required={required}
          placeholder={labelText}
          {...props}
        >
          {children}
        </select>
      </FormControl>
    );
  },
);
