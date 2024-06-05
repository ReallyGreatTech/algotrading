import { InputHTMLAttributes } from 'react';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
}

const SelectInput = ({
  options,
  defaultValue,
  value,
  ...rest
}: SelectInputProps) => {
  return (
    <select
      {...rest}
      className="bg-[#207868]  text-white text-sm rounded-lg h-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
    >
      {options.map((option, index) => (
        <option
          key={index}
          selected={Boolean(defaultValue)}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
