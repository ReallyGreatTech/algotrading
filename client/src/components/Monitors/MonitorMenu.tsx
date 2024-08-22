import { Button, Popover } from 'antd';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';
import { IoMdAddCircle } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { Position } from '../../types';
import EditPositionMonitorDialog from '../Dialogs/EditPositionMonitorDialog';
import { useState } from 'react';
import { selectPosition } from '../../redux/features/sub_positions/sub-positions';
import { useAppDispatch } from '../../hooks';
import ViewPositionMonitorDialog from '../Dialogs/ViewPositionMonitorDialog';

interface MonitorMenuProps {
  position: Position;
  fieldLabel: string;
  onField: keyof Position;
  fieldValue: number | string;
}

const MonitorMenu = ({
  position,
  fieldLabel,
  onField,
  fieldValue,
}: MonitorMenuProps) => {
  const [editMonitorDialogOpen, setEditMonitorDialogOpen] = useState(false);
  const [viewMonitorDialogOpen, setViewMonitorDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const hide = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  return (
    <>
      <Popover
        color="#334154"
        placement="rightBottom"
        content={
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#334154] p-4 text-white"
          >
            <div className="my-3">
              <div className="flex border-b-2 border-purple-400 text-sm items-center mb-3 gap-1 pb-1">
                <h4 className="text-center text-lg font-bold">Monitors</h4>
                <HiMiniQuestionMarkCircle fontSize={'18px'} />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-sm">
                  <span className="font-bold">Field: </span> {fieldLabel}
                </h3>
                <p className="text-sm">
                  <span className="font-bold">Value:</span> {fieldValue}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Monitors Set: </span>0
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              <Button
                icon={<FaEye />}
                onClick={(e) => {
                  e.stopPropagation();
                  hide(); // Close the Popover
                  dispatch(selectPosition(position));
                  setViewMonitorDialogOpen(true); // Open the dialog
                }}
              >
                View
              </Button>
              <Button
                icon={<IoMdAddCircle />}
                onClick={(e) => {
                  e.stopPropagation();
                  hide(); // Close the Popover
                  dispatch(selectPosition(position));
                  setEditMonitorDialogOpen(true); // Open the dialog
                }}
              >
                Add
              </Button>
            </div>
          </div>
        }
        trigger="hover"
        open={open}
        onOpenChange={setOpen}
      >
        <span onClick={() => setOpen(!open)}>{fieldValue}</span>
      </Popover>

      <EditPositionMonitorDialog
        position={position}
        // positionMonitor={null}
        open={editMonitorDialogOpen}
        fieldLabel={fieldLabel}
        onField={onField}
        onClose={() => {
          setEditMonitorDialogOpen(false);
        }}
      />
      <ViewPositionMonitorDialog
        positionMonitor={null}
        open={viewMonitorDialogOpen}
        onClose={() => {
          setViewMonitorDialogOpen(false);
        }}
      />
    </>
  );
};

export default MonitorMenu;
