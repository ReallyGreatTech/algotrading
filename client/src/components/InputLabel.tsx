// import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { LabelHTMLAttributes } from 'react';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const InputLabel = ({ children, ...rest }: InputLabelProps) => {
  return (
    <label {...rest} className="inline-block text-white/90 text-sm mx-px mb-1">
      {children}
    </label>
  );
};

export default InputLabel;
