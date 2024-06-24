import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

const PaginationControls = () => {
  return (
    <div className="flex justify-end p-3 gap-2">
      <button className="p-2 rounded-full hover:bg-primary-dark text-white text-lg">
        <MdNavigateBefore />
      </button>
      <button className="p-2 rounded-full hover:bg-primary-dark text-white text-lg">
        <MdNavigateNext />
      </button>
    </div>
  );
};

export default PaginationControls;
