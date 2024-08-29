import {
  DialogProps,
  EditPositionGroupMonitorData,
  PositionGroupMonitor,
} from "../../types";
import { IoMdClose } from "react-icons/io";
import Dialog from "./AppDialog";
import { Formik } from "formik";
import FormInput from "../Form/FormInput";
import FormSelectInput from "../Form/FormSelectInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchPositionGroupMonitors, updatePositionGroupMonitor } from "../../redux/api/positionGroupMonitors";
interface EditPositionMonitorDialogProps extends DialogProps {
  positionGroupMonitor: PositionGroupMonitor;
}

enum EvaluationMethod {
  VALUE = "VALUE",
  METHOD = "METHOD",
  ABS_DISTANCE = "ABS_DISTANCE",
}

const EditPositionGroupMonitorDialog = ({
  positionGroupMonitor,
  open,
  onClose,
  ...rest
}: EditPositionMonitorDialogProps) => {
  //   const dispatch = useAppDispatch();
  const { isPending } = useAppSelector((state) => state.positionMonitors);

  const dispatch = useAppDispatch();
  // const selectedPosition = useAppSelector((state) => state.subPositions.selectedPosition)

  const handleEditPositionMonitor = async (
    data: EditPositionGroupMonitorData
  ) => {
    try {
      console.log("Data to be edited", data);
      await dispatch(
        updatePositionGroupMonitor({ id: positionGroupMonitor.id, data })
      );
      dispatch(fetchPositionGroupMonitors());
      onClose();
    } catch (error) {
      console.error("Error editing position monitor:", error);
    }
  };

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      rootStyle={{ maxWidth: "38em" }}
    >
      <Formik<EditPositionGroupMonitorData>
        initialValues={{
          token: positionGroupMonitor.token,
          evaluation_method: positionGroupMonitor.evaluation_method,
          on_field: positionGroupMonitor.on_field,
          base_value: positionGroupMonitor.base_value?.toString(),
          on_value: positionGroupMonitor.on_value?.toString(),
          on_abs_distance: positionGroupMonitor.on_abs_distance?.toString(),
          enabled: positionGroupMonitor.enabled,
        }}
        onSubmit={handleEditPositionMonitor}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
                <div className="flex justify-between items-center px-3 py-6">
                  <div>
                    <h3 className="text-white/80 font-semibold text-xl mb-3">
                      Edit Monitor
                    </h3>
                    {/* <p className="text-xs">
                      This monitor will be edited for{" "}
                      <span className="font-bold text-primary">
                        {fieldLabel}
                      </span>
                    </p> */}
                  </div>
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
                    <div className="mb-5 p-5  grid grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <FormSelectInput
                          label="Evaluation Method"
                          name="evaluation_method"
                          options={[
                            {
                              label: EvaluationMethod.VALUE,
                              value: EvaluationMethod.VALUE,
                            },
                            {
                              label: EvaluationMethod.ABS_DISTANCE,
                              value: EvaluationMethod.ABS_DISTANCE,
                            },
                          ]}
                        />
                      </div>

                      <div className="col-span-1">
                        <FormInput
                          name="base_value"
                          label="Base Value"
                          placeholder="Input a base value"
                          disabled
                        />
                      </div>
                      {values.evaluation_method === EvaluationMethod.VALUE && (
                        <div className="col-span-1">
                          <FormInput
                            name="on_value"
                            label="On Value"
                            placeholder="Input a value"
                          />
                        </div>
                      )}
                      {values.evaluation_method ===
                        EvaluationMethod.ABS_DISTANCE && (
                        <div className="col-span-1">
                          <FormInput
                            name="on_abs_distance"
                            label="On Abs Distance"
                            placeholder="Enter On Abs Distance"
                          />
                        </div>
                      )}
                      {values.evaluation_method === EvaluationMethod.METHOD && (
                        <div className="col-span-1">
                          <FormInput
                            name="on_method"
                            label="On Method"
                            placeholder="Enter On Method"
                          />
                        </div>
                      )}
                      <div className="col-span-2">
                        <FormSelectInput
                          label="Enabled?"
                          name="enabled"
                          options={[
                            { label: "Enabled", value: "true" },
                            { label: "Disabled", value: "false" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 flex justify-end gap-5">
                  <button
                    className="py-3 px-5 border-2 border-primary rounded-lg text-white/90 shadow-primary"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    className={`py-3 px-5 bg-primary rounded-lg text-white shadow-primary ${
                      isPending ? "animate-pulse" : ""
                    }`}
                    onClick={() => handleSubmit()}
                  >
                    {isPending ? "Editing Monitor" : "Edit Monitor"}
                  </button>
                </div>
              </div>
            </>
          );
        }}
      </Formik>
    </Dialog>
  );
};

export default EditPositionGroupMonitorDialog;
