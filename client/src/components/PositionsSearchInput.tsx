import React, { useState } from 'react';
import { useField } from 'formik';
import { IoIosArrowDown } from 'react-icons/io';

interface Option {
  label: string;
  value: string;
}

interface PositionsSearchInput {
  label: string;
  name: string;
  placeholder: string;
  options: Option[];
}

const PositionsSearchInput: React.FC<PositionsSearchInput> = ({ label, options, ...props }) => {
  const [field, meta, helpers] = useField(props);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <label htmlFor={props.name} className="block text-sm font-medium text-white/80 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          {...field}
          {...props}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onClick={() => setIsOpen(true)}
        //   className="w-full px-4 py-2 bg-[#0F1621] text-white/80 rounded-lg border border-white/20 focus:outline-none focus:border-primary"
          className="bg-gray-900 py-4 rounded-lg p-2.5  border border-white/20 w-full"
        />
        <IoIosArrowDown
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/80"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-[#0F1621] border border-white/20 rounded-lg shadow-lg max-h-60 overflow-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.value}
              className="px-4 py-2 hover:bg-primary/20 cursor-pointer text-white/80"
              onClick={() => {
                helpers.setValue(option.value);
                setSearchTerm(option.label);
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default PositionsSearchInput;