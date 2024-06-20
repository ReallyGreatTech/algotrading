import { DataItem, DialogProps } from '../../types';
import { IoMdClose } from 'react-icons/io';
import AppTable from '../AppTable';
import Dialog from './AppDialog';
import {
  positionsTableColumn,
  positionsTableSampleData,
} from '../../constants/data/positionsPage';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

interface PositionsTableDialogProps extends DialogProps {}

const PositionsTableDialog = ({
  open,
  onClose,
  ...rest
}: PositionsTableDialogProps) => {
  return (
    <Dialog {...rest} open={open} onClose={onClose} maxWidth="full" fullWidth>
      <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
        <div className="flex justify-between items-center px-3 py-6">
          <h3 className="text-white font-semibold text-xl">Positions Table</h3>
          <button
            onClick={onClose}
            className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
            style={{}}
          >
            <IoMdClose />
          </button>
        </div>

        <div className="mb-5">
          <div className="overflow-x-auto h-[30em]">
            <AppTable<DataItem>
              columns={positionsTableColumn}
              data={positionsTableSampleData}
            />
          </div>
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

export default PositionsTableDialog;
