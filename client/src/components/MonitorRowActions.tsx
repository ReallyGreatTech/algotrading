import {  PositionMonitor } from "../types";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
import EditMonitorDialog from "./Dialogs/EditMonitorDialog";
import { useAppDispatch, useAppSelector } from "../hooks";
import { deletePositionMonitors } from "../redux/api/position-monitors";

interface MonitorRowActionsProps {
  
  positionMonitor: PositionMonitor;
}

const MonitorRowActions = ({ positionMonitor }: MonitorRowActionsProps) => {
  const { isPending: deleting } = useAppSelector(
    (state) => state.positionMonitors
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  // const dispatch = useAppDispatch();

  const handleDeletemonitor = async () => {
    dispatch(deletePositionMonitors({ id: positionMonitor.id }))
    
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

          handleDeletemonitor();
        }}
        className={`p-4 md:p-2 hover:bg-primary-dark rounded-full ${
          deleting ? "animate-spin" : ""
        }`}
      >
        <RiDeleteBin5Line />
      </button>

      <EditMonitorDialog
        positionMonitor={positionMonitor}
        open={dialogOpen}
        rootStyle={{ maxWidth: "38em" }}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default MonitorRowActions;
