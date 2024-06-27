import { Investor } from '../types';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAppDispatch } from '../hooks';
import { deleteInvestor } from '../redux/api/investors';

interface InvestorRowActionButtonsProps {
  investor: Investor;
}

const InvestorRowActionButtons = ({
  investor,
}: InvestorRowActionButtonsProps) => {
  const dispatch = useAppDispatch();

  const handleDeleteInvestor = () => {
    dispatch(deleteInvestor(investor.id));
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          console.log('Editing: ', investor);
        }}
        className="p-1 hover:bg-primary-dark rounded-full"
      >
        <FiEdit2 />
      </button>
      <button
        onClick={handleDeleteInvestor}
        className="p-1 hover:bg-primary-dark rounded-full"
      >
        <RiDeleteBin5Line />
      </button>
    </div>
  );
};

export default InvestorRowActionButtons;
