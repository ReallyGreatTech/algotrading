import { DialogProps, Wallet } from '../../types';
import { IoMdClose } from 'react-icons/io';
import Dialog from './AppDialog';
import Input from '../Input';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useState } from 'react';
import { updateWallet } from '../../redux/api/wallets';

interface EditWalletDialogProps extends DialogProps {
  wallet: Wallet;
}

const EditWalletDialog = ({
  wallet,
  open,
  onClose,
  ...rest
}: EditWalletDialogProps) => {
  const [walletFormData, setWalletFormData] = useState({
    name: wallet.name,
    address: wallet.address,
    balance: wallet.total_investment.toString(),
  });

  const wallets = useAppSelector((state) => state.wallets);

  const dispatch = useAppDispatch();

  const handleUpdateWallet = async () => {
    await dispatch(
      updateWallet({
        id: wallet.id,
        data: walletFormData,
      })
    );

    onClose();
  };

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      rootStyle={{ maxWidth: '43em' }}
    >
      <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
        <div className="flex justify-between items-center px-3 py-6">
          <h3 className="text-white/80 font-semibold text-xl">Edit Wallet</h3>
          <button
            onClick={onClose}
            className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
            style={{}}
          >
            <IoMdClose />
          </button>
        </div>

        <div>
          <div className="mb-5 p-5 flex flex-col gap-5">
            <div>
              <div className="col-span-2">
                <Input
                  value={walletFormData.name}
                  autoFocus
                  placeholder="Add Wallet name"
                  label="Wallet Name"
                  onChange={(evt) =>
                    setWalletFormData({
                      ...walletFormData,
                      name: evt.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div className="col-span-2">
              <Input
                placeholder="Add address "
                label="Wallet wallet address"
                value={walletFormData.address}
                onChange={(evt) =>
                  setWalletFormData({
                    ...walletFormData,
                    address: evt.target.value,
                  })
                }
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Add wallet balance"
                label="Wallet Balance"
                value={walletFormData.balance}
                onChange={(evt) =>
                  setWalletFormData({
                    ...walletFormData,
                    balance: evt.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="p-5 flex justify-end gap-5">
          <button
            className="py-3 px-5 border-2 border-primary rounded-lg text-white/90 shadow-primary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`py-3 px-5 bg-primary rounded-lg text-white shadow-primary ${
              wallets.isPending ? 'animate-pulse' : 'animate-none'
            }`}
            onClick={handleUpdateWallet}
          >
            {wallets.isPending ? 'Updating...' : 'Update Wallet'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default EditWalletDialog;
