import { DialogProps } from '../../types';
import { IoMdClose } from 'react-icons/io';
import Dialog from './AppDialog';
import Input from '../Input';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addInvestor } from '../../redux/api/investors';
import { useState } from 'react';

interface AddInvestorDialogProps extends DialogProps {}

const AddInvestorDialog = ({
  open,
  onClose,
  ...rest
}: AddInvestorDialogProps) => {
  const dispatch = useAppDispatch();
  const investors = useAppSelector((state) => state.investors);
  const [name, setName] = useState('');

  const handleAddInvestor = async () => {
    if (name)
      await dispatch(
        addInvestor({
          name,
        })
      );

    onClose();
  };

  return (
    <Dialog {...rest} open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
        <div className="flex justify-between items-center px-3 py-6">
          <h3 className="text-white/80 font-semibold text-xl">Add Investor</h3>
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
                  placeholder="Add investor name"
                  label="Investor Name"
                  onChange={({ target: input }) => setName(input.value)}
                />
              </div>
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
            className="py-3 px-5 bg-primary rounded-lg text-white shadow-primary"
            onClick={handleAddInvestor}
          >
            {investors.isPending ? 'Adding investor...' : 'Add Investor'}
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default AddInvestorDialog;
