import React, { useState, useEffect, useRef } from "react";

interface SearchInputProps {
  options: string[];
  placeholder?: string;
  label: string;

  onSelectionChange?: (selectedOptions: string[]) => void; // New prop
}

const ExchangeSearchInput: React.FC<SearchInputProps> = ({
  options,
  placeholder = "Search/Enter a Value",
  label,
 
  onSelectionChange,
}) => {
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options);
  // const [inputValue ,setInputValue] = useState<string>("");
  const [,setInputValue] = useState<string>("");
  const [listOpened, setListOpened] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<string[]>(options); // New state
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const handleOptionClick = (value: string) => {
   
    setInputValue(value);
    setListOpened(false);
  };

  const handleCheckboxChange = (option: string) => {
    let newSelectedOptions = [];
    if (selectedOptions.includes(option)) {
      newSelectedOptions = selectedOptions.filter((o) => o !== option);
    } else {
      newSelectedOptions = [...selectedOptions, option];
    }
    setSelectedOptions(newSelectedOptions);
    if (onSelectionChange) {
      onSelectionChange(newSelectedOptions);
    }
  };

  const toggleList = () => {
    setListOpened(!listOpened);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target as Node) &&
      listRef.current &&
      !listRef.current.contains(e.target as Node)
    ) {
      setListOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  useEffect(() => {
    setSelectedOptions(options); // Reset selected options when options change
  }, [options]);

  return (
    <div>
      <h2 className="mb-2">{label}</h2>
      <div className="rounded-lg flex justify-center items-start">
        <div className="relative searchable-list w-full">
          <input
            ref={inputRef}
            type="text"
            className="border border-white/20 data-list peer w-[100%] h-full rounded-md bg-gray-900 py-4 cursor-pointer outline-none text-gray-400 caret-gray-200 pl-2 pr-7 focus:bg-gray-900 font-bold transition-all duration-300 text-sm text-overflow-ellipsis"
            spellCheck="false"
            placeholder={placeholder}
          
            onChange={handleInputChange}
            onClick={() => setListOpened(true)}
          />
          <svg
            className={`outline-none cursor-pointer fill-gray-400 absolute transition-all duration-200 h-full w-4 right-2 top-[50%] -translate-y-[50%] ${
              listOpened ? "rotate-0" : "-rotate-90"
            }`}
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            onClick={toggleList}
          >
            <path d="M0 256l512 512L1024 256z"></path>
          </svg>
          <ul
            ref={listRef}
            className={`absolute option-list overflow-y-scroll max-h-64 min-h-[0px] flex flex-col top-12 left-14 max-w-[90%] min-w-[90%] bg-white rounded-sm transition-all duration-200 origin-top-left ${
              listOpened ? "scale-100 opacity-100" : "scale-0 opacity-0"
            }`}
          >
            {filteredOptions.map((option) => (
              <li
                key={option}
                className="p-2 flex items-center text-gray-200 bg-gray-600 "
              >
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="mr-2 w-6 h-6  rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                />
                <span
                  className="cursor-pointer"
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExchangeSearchInput;
