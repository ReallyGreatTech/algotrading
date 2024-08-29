import { Button, Popover } from "antd";
import { HiMiniQuestionMarkCircle } from "react-icons/hi2";
import { IoMdAddCircle } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import {   PositionGroupMonitor , PositionsGroup } from "../../types";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchPositionMonitors } from "../../redux/api/position-monitors";
import CreatePositionGroupMonitor from "../Dialogs/CreatePositionGroupMonitor";
import ViewPositionGroupMonitorDialog from "../Dialogs/ViewPositionGroupMonitorDialog";
import { MdMonitorHeart } from "react-icons/md";

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
  }, [positionGroup.token,positionGroupMonitors, onField]);

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
              <div className="flex border-b border-primary-light/80 text-sm items-center mb-3 gap-1 pb-1">
                <h4 className="text-center text-lg font-bold">
                  Position Group Monitors
                </h4>
                <HiMiniQuestionMarkCircle fontSize={"18px"} />
              </div>

              <div className="flex flex-col gap-1">
                <h3 className="text-sm">
                  <span className="font-bold">Field: </span> {fieldLabel}
                </h3>
                <p className="text-sm">
                  <span className="font-bold">Value:</span> {fieldValue}
                </p>
                <p className="text-sm">
                  <span className="font-bold">Monitors Set: </span>{" "}
                  {selectedMonitors.length}
                </p>
              </div>
            </div>

            <div className="flex gap-1">
              <Button
                icon={<FaEye />}
                onClick={(e) => {
                  e.stopPropagation();
                  hide(); // Close the Popover
                  // dispatch(selectPosition(position));
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
                  dispatch(fetchPositionMonitors());
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

        <div className="inline-flex gap-2 items-center justify-center px-1">
        <span onClick={() => setOpen(!open)}>{fieldValue}</span>
       {selectedMonitors.length ? <MdMonitorHeart className="text-green-400"  />:null} 
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
