import {
  CreatePositionMonitorFormData,
  DialogProps,
  PositionGroupMonitor,
  PositionsGroup,
  
} from "../../types";
import { IoMdClose } from "react-icons/io";
import Dialog from "./AppDialog";
import { Formik } from "formik";
import {  positionGroupMonitorTableColumn } from "../../constants/data/positionsPage";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createPositionMonitor } from "../../redux/api/positionMonitors";
import AppTable from "../AppTable";
import { useEffect, useState } from "react";
import { fetchPositionMonitors } from "../../redux/api/position-monitors";
import { FaFrownOpen } from "react-icons/fa";

interface EditPositionGroupMonitorData extends DialogProps {
  positionGroup: PositionsGroup;
  onField: keyof PositionsGroup;
  fieldLabel: string;
}

const ViewPositionGroupMonitorDialog = ({
  positionGroup,
  open,
  onClose,
  onField,
  fieldLabel,
  ...rest
}: EditPositionGroupMonitorData) => {

  const positionGroupMonitors = useAppSelector(
    (state) => state.positionGroupMonitors.data
  );

  const dispatch = useAppDispatch();

  const [selectedMonitors, setSelectedMonitors] = useState<PositionGroupMonitor[]>(
    []
  );

  useEffect(() => {
    dispatch(fetchPositionMonitors());
  }, [dispatch]);

  useEffect(() => {
    const filteredMonitors = positionGroupMonitors.filter(
      (monitor) =>
        monitor.on_field === onField && positionGroup.token === monitor.token
    );
    setSelectedMonitors(filteredMonitors);
  }, [positionGroupMonitors, onField, positionGroup.token]);

  const handleCreatePositionMonitor = async (data: unknown) => {
    dispatch(createPositionMonitor({ data }));
  };

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      rootStyle={{ maxWidth: "43em" }}
    >
      <Formik<CreatePositionMonitorFormData>
        initialValues={{
          category_name: "",
          evaluation_method: "",
          on_field: "",
          base_value: "",
          on_value: "",
          on_abs_distance: "",
          on_method: "",
          enabled: true,
          category: 0,
          subject: 0,
        }}
        onSubmit={handleCreatePositionMonitor}
      >
        {() => (
          <>
            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
              <div className="flex justify-between items-center px-3 pt-6">
                <h3 className="text-white/80 font-semibold text-xl ps-4">
                  Viewing Monitors {""}
                  <span className="text-primary font-bold">({fieldLabel})</span>
                </h3>

                <button
                  onClick={onClose}
                  className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                >
                  <IoMdClose />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-auto">
                <div className="mb-5 p-5">
                  {selectedMonitors.length > 0 ? (
                    <AppTable<PositionGroupMonitor>
                      tableBodyRowClassName="cursor-pointer"
                      columns={positionGroupMonitorTableColumn}
                      data={selectedMonitors}
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-5 justify-center">
                      <span>
                        <FaFrownOpen fontSize={"3rem"} />
                      </span>
                      <h4 className=" text-2xl font-bold text-center">
                        No monitors have been set for{" "}
                        <span className="text-primary"> {fieldLabel}</span> on
                        this position Group.
                      </h4>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 flex justify-end gap-5">
                {/* Placeholder for buttons or additional actions */}
              </div>
            </div>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default ViewPositionGroupMonitorDialog;
