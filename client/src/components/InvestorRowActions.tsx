import { Investor } from '../types';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAppDispatch } from '../hooks';
import { deleteInvestor } from '../redux/api/investors';
import { useState } from 'react';
import EditInvestorDialog from './Dialogs/EditInvestorDialog';

interface InvestorRowActionsProps {
  investor: Investor;
}

const InvestorRowActions = ({ investor }: InvestorRowActionsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
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
        onClick={(e) => {
          e.stopPropagation();

          setDialogOpen(true);
        }}
        className="p-4 md:p-2 hover:bg-primary-dark rounded-full"
      >
        <FiEdit2 />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();

          handleDeleteInvestor();
        }}
        className={`p-4 md:p-2 hover:bg-primary-dark rounded-full ${
          deleting ? 'animate-spin' : ''
        }`}
      >
        <RiDeleteBin5Line />
      </button>

      <EditInvestorDialog
        investor={investor}
        open={dialogOpen}
        rootStyle={{ maxWidth: '38em' }}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default InvestorRowActions;
