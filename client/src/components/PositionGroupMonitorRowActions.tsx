import { PositionGroupMonitor } from "../types";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useState } from "react";
// import EditMonitorDialog from "./Dialogs/EditMonitorDialog";
import { useAppDispatch } from "../hooks";
import { unwrapResult } from "@reduxjs/toolkit";
import { deletePositionGroupMonitor, fetchPositionGroupMonitors } from "../redux/api/positionGroupMonitors";
import EditPositionGroupMonitorDialog from "./Dialogs/EditPositionGroupMonitorDialog";

interface MonitorRowActionsProps {
  positionGroupMonitor: PositionGroupMonitor;
}

const PositionGroupMonitorRowActions = ({
  positionGroupMonitor,
}: MonitorRowActionsProps) => {
  const [deleting, setDeleting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeletemonitor = async () => {
    setDeleting(true);
    try {
      const resultAction = await dispatch(
        deletePositionGroupMonitor({ id: positionGroupMonitor.id })
      );
      unwrapResult(resultAction); // Unwraps and throws if there's an error
    } catch (error) {
      console.error("Failed to delete monitor:", error);
    } finally {
      setDeleting(false);
      dispatch(fetchPositionGroupMonitors());
    }
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

      <EditPositionGroupMonitorDialog
        positionGroupMonitor={positionGroupMonitor}
        open={dialogOpen}
        rootStyle={{ maxWidth: "38em" }}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default PositionGroupMonitorRowActions;
