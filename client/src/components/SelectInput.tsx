import { InputHTMLAttributes } from "react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectInputProps extends InputHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  label: string;
}

const SelectInput = ({
  options,
  defaultValue,

  label,
  ...rest
}: SelectInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="select" className="mb-2">
        {label}
      </label>
      <select
        {...rest}
        className="bg-gray-900 py-4 rounded-lg p-2.5  border border-white/20 "
      >
        {options.map((option, index) => (
          <option
            className="text-[16px]"
            key={index}
            selected={Boolean(defaultValue)}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
