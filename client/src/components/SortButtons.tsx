
import {  FaSortUp, FaSortDown } from 'react-icons/fa';

interface SortButtonsProps {
  sortDirection: 'asc' | 'desc' | null;
  onSort: (direction: 'asc' | 'desc') => void;
}

const SortButtons: React.FC<SortButtonsProps> = ({ sortDirection, onSort }) => {
  return (
    <div className="inline-flex flex-col ml-1">
      <button
        onClick={() => onSort('asc')}
        className={`focus:outline-none ${
          sortDirection === 'asc' ? 'text-primary' : 'text-gray-400'
        }`}
      >
        <FaSortUp size={12} />
      </button>
      <button
        onClick={() => onSort('desc')}
        className={`focus:outline-none ${
          sortDirection === 'desc' ? 'text-primary' : 'text-gray-400'
        }`}
      >
        <FaSortDown size={12} />
      </button>
    </div>
  );
};

export default SortButtons;