import { Wallet } from '../types';
import { FiEdit2 } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { useAppDispatch } from '../hooks';
import { useState } from 'react';
import { deleteWallet } from '../redux/api/wallets';
import EditWalletDialog from './Dialogs/EditWalletDialog';

interface WalletRowActionButtonsProps {
  wallet: Wallet;
}

const WalletRowActionButtons = ({ wallet }: WalletRowActionButtonsProps) => {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDeleteWallet = async () => {
    setDeleting(true);
    await dispatch(deleteWallet(wallet.id));
    setDeleting(false);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          setDialogOpen(true);
        }}
        className="p-4 md:p-2 hover:bg-primary-dark rounded-full"
      >
        <FiEdit2 />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();

          handleDeleteWallet();
        }}
        className={`p-4 md:p-2 hover:bg-primary-dark rounded-full ${
          deleting ? 'animate-spin' : ''
        }`}
      >
        <RiDeleteBin5Line />
      </button>

      <EditWalletDialog
        wallet={wallet}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default WalletRowActionButtons;
