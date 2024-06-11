import { InputHTMLAttributes } from "react";

interface SelectInputProps extends InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  defaultValue?: string;
  label: string;
}

const FilterInput = ({ defaultValue, label, ...rest }: SelectInputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="select" className="mb-2">
        {label}
      </label>
      <input
        {...rest}
        type="text"
              value={defaultValue}
              placeholder="Mininum funding rate. Eg: 10"
        className="bg-gray-900 py-4 rounded-lg p-2.5  border border-white/20  text-gray-400 font-bold"
      />
    </div>
  );
};

export default FilterInput;
