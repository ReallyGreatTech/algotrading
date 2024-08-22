import { DialogProps, Monitor, Position } from "../../types";
import { IoMdClose } from "react-icons/io";
import Dialog from "./AppDialog";
import { Formik } from "formik";
import { monitorTableColumn } from "../../constants/data/positionsPage";
import { useAppDispatch } from "../../hooks";
import { createPositionMonitor } from "../../redux/api/positionMonitors";
import AppTable from "../AppTable";
import { monitorsMockData } from "../../constants/data/monitorsDummyData";

interface ViewMonitorDialogProps {
  category_name: string;
  evaluation_method: string;
  on_field?: string | null;
  base_value?: string | null;
  on_value?: string | null;
  on_abs_distance?: string | null;
  on_method: string;
  enabled: boolean;
  category: number;
  subject: number;
}

interface EditPositionMonitorDialogProps extends DialogProps {
  positionMonitor: Position;
}


const ViewPositionMonitorDialog = ({
  positionMonitor,
  open,
  onClose,
  ...rest
}: EditPositionMonitorDialogProps) => {
  //   const dispatch = useAppDispatch();

  const dispatch = useAppDispatch();
  // const selectedPosition = useAppSelector((state) => state.subPositions.selectedPosition)

  const handleCreatePositionMonitor = async (data: unknown) => {
    dispatch(createPositionMonitor({ data: data }));

    // onClose();
  };

  console.log(positionMonitor)

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      rootStyle={{ maxWidth: "43em" }}
    >
      <Formik<PositionMonitorEditFormData>
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
        {() => {
                 

          return (
            <>
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
                <div className="flex justify-between items-center px-3 py-6">
                  <h3 className="text-white/80 font-semibold text-xl ps-4">
                    View Monitors
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                    style={{}}
                  >
                    <IoMdClose />
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-auto">
                  <div>
                    <div className="mb-5 p-5  ">
                      <AppTable<Monitor>
                        tableBodyRowClassName="cursor-pointer"
                        
                        columns={monitorTableColumn}
                        data={monitorsMockData}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex justify-end gap-5">
                  {/* <button
                    className="py-3 px-5 border-2 border-primary rounded-lg text-white/90 shadow-primary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className={`py-3 px-5 bg-primary rounded-lg text-white shadow-primary `}
                    onClick={() => handleSubmit()}
                  >
                    {/* {true ? "Creating Monitor" : "Create Monitor"} *
                    Edit Monitors
                  </button> */}
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default ViewPositionMonitorDialog;
