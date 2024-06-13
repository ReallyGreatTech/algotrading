interface timeFilterOptions {
  time: string;
  isSelected: boolean;
}

const timeOptions = [
  {
    time: "1H",
    isSlected: false,
  },
  {
    time: "1D",
    isSlected: false,
  },

  {
    time: "1W",
    isSlected: false,
  },
  {
    time: "1M",
    isSlected: false,
  },
  {
    time: "3M",
    isSlected: false,
  },
  {
    time: "1Y",
    isSlected: false,
  },
];

interface timeFilterProps {
  time: string;
  isActive: boolean;
}

const TimeFilter = ({time,isActive}:timeFilterProps) => {
  return (
    <div className="flex gap-2 md:gap-6">
      {timeOptions.map((item, index) => {
        return (
          <button
            key={index}
            className="w-10 h-7 border rounded-[17px] bg-gray-700 items-center justify-center flex"
          >
            <span className="text-[12px]"> {item.time}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TimeFilter;
