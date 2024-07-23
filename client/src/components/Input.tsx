import { InputHTMLAttributes } from 'react';
import InputLabel from './InputLabel';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

const Input = ({ id, className, label, helperText, ...rest }: InputProps) => {
  return (
    <div>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <input
        {...rest}
        className={`w-full px-5 py-3 border border-white/20 bg-[#0F1621] rounded-lg text-white/80 disabled:opacity-50 ${className}`}
      />
      {helperText && <span>{helperText}</span>}
    </div>
  );
};

export default Input;
