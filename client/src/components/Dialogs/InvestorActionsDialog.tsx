import { DialogProps, InvestorAction } from '../../types';
import { IoMdClose } from 'react-icons/io';
import AppTable from '../AppTable';
import Dialog from './AppDialog';
import { investorActionTableColumn } from '../../constants/data/positionsPage';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { useAppSelector } from '../../hooks';

interface InvestorActionsDialogProps extends DialogProps {}

const InvestorActionsDialog = ({
  open,
  onClose,
  ...rest
}: InvestorActionsDialogProps) => {
  const investorActions = useAppSelector((state) => state.investorActions);

  return (
    <Dialog {...rest} open={open} onClose={onClose} maxWidth="xl" fullWidth>
      <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
        <div className="flex justify-between items-center px-3 py-6">
          <h3 className="text-white font-semibold text-xl">Investor Actions</h3>
          <button
            onClick={onClose}
            className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
            style={{}}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="mb-5">
          {investorActions.loading ? (
            <div className="py-10 text-center text-sm text-white/90">
              Loading investor actions...
            </div>
          ) : (
            <div className="overflow-x-auto min-h-14 max-h-[22em]">
              <AppTable<InvestorAction>
                columns={investorActionTableColumn}
                data={investorActions.data}
              />
            </div>
          )}
        </div>

        <div className="flex justify-end p-3 gap-2">
          <button className="p-2 rounded-full hover:bg-primary-dark text-white text-lg">
            <MdNavigateBefore />
          </button>
          <button className="p-2 rounded-full hover:bg-primary-dark text-white text-lg">
            <MdNavigateNext />
          </button>
        </div>
      </div>
    </Dialog>
  );
};

export default InvestorActionsDialog;
