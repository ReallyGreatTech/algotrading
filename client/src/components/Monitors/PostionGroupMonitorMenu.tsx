import { Popover } from 'antd';
import { HiMiniQuestionMarkCircle } from 'react-icons/hi2';
import { IoMdAddCircle } from 'react-icons/io';
import { FaEye } from 'react-icons/fa';
import { PositionGroupMonitor, PositionsGroup } from '../../types';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPositionMonitors } from '../../redux/api/position-monitors';
import CreatePositionGroupMonitor from '../Dialogs/CreatePositionGroupMonitor';
import ViewPositionGroupMonitorDialog from '../Dialogs/ViewPositionGroupMonitorDialog';

interface MonitorMenuProps {
  positionGroup: PositionsGroup;
  fieldLabel: string;
  onField: keyof PositionsGroup;
  fieldValue: number | string;
}

const PositionGroupMonitorMenu = ({
  positionGroup,
  fieldLabel,
  onField,
  fieldValue,
}: MonitorMenuProps) => {
  const [editMonitorDialogOpen, setEditMonitorDialogOpen] = useState(false);
  const [viewMonitorDialogOpen, setViewMonitorDialogOpen] = useState(false);
  const positionGroupMonitors = useAppSelector(
    (state) => state.positionGroupMonitors.data
  );

  const [selectedMonitors, setSelectedMonitors] = useState<
    PositionGroupMonitor[]
  >([]);
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredMonitors = positionGroupMonitors.filter(
      (monitor) =>
        monitor.on_field === onField && monitor.token === positionGroup.token
    );
    setSelectedMonitors(filteredMonitors);
  }, [positionGroup.token, positionGroupMonitors, onField]);

  return (
    <>
      <Popover
        color="#232C39"
        placement="rightTop"
        defaultOpen
        content={
          <div
            onClick={(e) => e.stopPropagation()}
            className="text-white -mt-3 -ml-3 -mr-3 -mb-3 overflow-hidden rounded-lg"
          >
            <div>
              <div className="flex bg-[#232C39] text-sm items-center justify-between mb-3 gap-1 px-3 py-2 pb-1">
                <h4 className="text-center font-semibold">
                  Position Group Monitors
                </h4>
                <HiMiniQuestionMarkCircle fontSize={'15px'} />
              </div>

              <div className="px-4 bg-[#324054] flex flex-col gap-5 py-4">
                <div className="flex flex-col gap-2 lg:min-w-56">
                  <h3 className="text-sm">
                    <span className="font-bold">Field: </span> {fieldLabel}
                  </h3>
                  <p className="text-sm">
                    <span className="font-bold">Value:</span> {fieldValue}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">Monitors Set: </span>{' '}
                    {selectedMonitors.length}
                  </p>
                </div>

                <div className="flex gap-4 justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      hide(); // Close the Popover
                      // dispatch(selectPosition(position));
                      setViewMonitorDialogOpen(true); // Open the dialog
                    }}
                    className="flex justify-center items-center gap-2 px-3 py-1 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                  >
                    <FaEye />
                    <span>View</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      hide(); // Close the Popover
                      dispatch(fetchPositionMonitors());
                      setEditMonitorDialogOpen(true); // Open the dialog
                    }}
                    className="flex justify-center items-center gap-2 px-4 py-1 bg-primary rounded-lg text-white shadow-primary"
                  >
                    <IoMdAddCircle />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        trigger="hover"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="inline-flex gap-2 items-center justify-between px-1">
          <span onClick={() => setOpen(!open)}>{fieldValue}</span>
          {selectedMonitors.length ? (
            <div className="bg-yellow-400 h-[0.4em] w-[0.35em] rounded-full" />
          ) : null}
        </div>
      </Popover>

      <CreatePositionGroupMonitor
        position={positionGroup}
        // positionMonitor={null}
        open={editMonitorDialogOpen}
        fieldLabel={fieldLabel}
        onField={onField}
        onClose={() => {
          setEditMonitorDialogOpen(false);
        }}
      />

      <ViewPositionGroupMonitorDialog
        fieldLabel={fieldLabel}
        onField={onField}
        positionGroup={positionGroup}
        open={viewMonitorDialogOpen}
        onClose={() => {
          setViewMonitorDialogOpen(false);
        }}
      />
    </>
  );
};

export default PositionGroupMonitorMenu;
