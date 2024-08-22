import {  Monitor } from "../types";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAppDispatch } from "../hooks";
// import { deletemonitor } from "../redux/api/monitors";
import { useState } from "react";
import EditMonitorDialog from "./Dialogs/EditMonitorDialog";

interface MonitorRowActionsProps {
  monitor: Monitor;
}

const MonitorRowActions = ({ monitor }: MonitorRowActionsProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDeletemonitor = async () => {
    // setDeleting(true);
    // await dispatch(deletemonitor(monitor.id));
    // setDeleting(false);
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
        monitor={monitor}
        open={dialogOpen}
        rootStyle={{ maxWidth: "38em" }}
        onClose={() => setDialogOpen(false)}
      />
    </div>
  );
};

export default MonitorRowActions;
