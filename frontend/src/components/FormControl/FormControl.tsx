import { FC, PropsWithChildren } from 'react';
import './FormControl.css';

interface Props {
  inputId?: string;
  labelText: string;
  required?: boolean;
  errorMsg?: string;
}

export const FormControl: FC<PropsWithChildren<Props>> = ({
  inputId,
  labelText,
  required = false,
  errorMsg,
  children,
}) => {
  return (
    <div className={errorMsg ? 'input-wrapper-error' : ''}>
      <div className={`input-label ${errorMsg ? 'input-label-error' : ''}`}>
        <label htmlFor={inputId}>
          {labelText}
          <span className="label-required">{required ? '*' : ''}</span>
        </label>
      </div>
      <div>{children}</div>
      {errorMsg && <div className="input-error-msg">{errorMsg}</div>}
    </div>
  );
};
