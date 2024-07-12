import { Investor } from '../types';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAppDispatch } from '../hooks';
import { deleteInvestor } from '../redux/api/investors';
import { useState } from 'react';

interface InvestorRowActionButtonsProps {
  investor: Investor;
}

const InvestorRowActionButtons = ({
  investor,
}: InvestorRowActionButtonsProps) => {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteInvestor = async () => {
    setDeleting(true);
    await dispatch(deleteInvestor(investor.id));
    setDeleting(false);
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
        onClick={(e) => {
          e.stopPropagation();

          handleDeleteInvestor();
        }}
        className={`p-1 hover:bg-primary-dark rounded-full ${
          deleting ? 'animate-spin' : ''
        }`}
      >
        <RiDeleteBin5Line />
      </button>
    </div>
  );
};

export default InvestorRowActionButtons;
