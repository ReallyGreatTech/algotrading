// import { InputHTMLAttributes, LabelHTMLAttributes } from 'react';
import { LabelHTMLAttributes } from 'react';

interface InputLabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

const InputLabel = ({ children, ...rest }: InputLabelProps) => {
  return (
    <label {...rest} className="inline-block text-white/90 text-sm mx-px mb-2">
      {children}
    </label>
  );
};

export default InputLabel;
