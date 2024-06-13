import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { updateFilter } from "../redux/features/timeFilter/timeFilter";
import { timeFilterOptions } from "../constants/selectOptions";

const TimeFilter = () => {
  const selectedTme = useAppSelector((state) => state.timefilter.time);
  const dispatch = useAppDispatch();

  //   const [isTimeSelected, setTiisSelected] = useState(false);
  const [timeSelected, setTimeSelected] = useState(selectedTme);
  const handleSelectedTIme = (item: string) => {
    setTimeSelected(item);
    console.log(item);
  };

  useEffect(() => {
    dispatch(updateFilter(timeSelected));
  }, [timeSelected]);

  console.log(timeSelected);
  return (
    <div className="flex gap-2 md:gap-4">
      {timeFilterOptions.map((item, index) => {
        return (
          <button
            onClick={() => handleSelectedTIme(item)}
            key={index}
            className={`w-10 h-7 font-bold border  rounded-[17px] bg-gray-700 items-center justify-center flex ${
              item === timeSelected ? "border-[#6366F1] border-2 text-white" : "border-gray-700 text-gray-500"
            }`}
          >
            <span className="text-[12px]"> {item}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TimeFilter;
