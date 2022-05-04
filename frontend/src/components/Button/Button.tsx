import { ButtonHTMLAttributes, FC, PropsWithChildren } from 'react';
import './Button.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => (
  <button className="button" {...props}>
    {children}
  </button>
);
