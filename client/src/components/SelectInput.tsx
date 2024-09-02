import { InputHTMLAttributes } from 'react';

type SelectOptionValue = string | number;

interface SelectOption {
  label: string;
  value: SelectOptionValue;
}

export interface SelectInputProps
  extends InputHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  label: string;
}

const SelectInput = ({
  options,
  defaultValue = undefined,
  placeholder,
  label,
  ...rest
}: SelectInputProps) => {
  return (
    <div className="flex flex-col text-white/90">
      <label htmlFor="select" className="mb-[0.5em]">
        {label}
      </label>
      <select
        {...rest}
        className="bg-gray-900 py-[0.85em] rounded-lg p-2.5  border border-white/20 "
      >
        {[{ value: '', label: placeholder }, ...options].map(
          (option, index) => (
            <option
              className="text-[16px]"
              key={index}
              selected={Boolean(defaultValue)}
              value={option.value}
              disabled={!option.value}
            >
              {option.label}
            </option>
          )
        )}
      </select>
    </div>
  );
};

export default SelectInput;
