import { DialogProps } from '../../types';
import { IoMdClose } from 'react-icons/io';
import Dialog from './AppDialog';
import Input from '../Input';
import InputLabel from '../InputLabel';

interface AddWalletDialogProps extends DialogProps {}

const AddWalletDialog = ({ open, onClose }: AddWalletDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
        <div className="flex justify-between items-center px-3 py-6">
          <h3 className="text-white/80 font-semibold text-xl">Add Wallet</h3>
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
                  autoFocus
                  placeholder="Add Wallet ID"
                  label="Wallet ID"
                />
              </div>
            </div>

            <div>
              <InputLabel>Start Time</InputLabel>
              <div className="grid grid-cols-2 gap-5">
                <div className="col-span-1">
                  <div className="col-span-2">
                    <Input type="date" className="uppercase" />
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="col-span-2">
                    <Input type="time" />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <Input
                placeholder="Add initial investment"
                label="Initial Investment"
              />
            </div>
            <div className="col-span-2">
              <Input
                placeholder="Add current investment"
                label="Current Investment"
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
          <button className="py-3 px-5 bg-primary rounded-lg text-white shadow-primary">
            Add Wallet
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddWalletDialog;
