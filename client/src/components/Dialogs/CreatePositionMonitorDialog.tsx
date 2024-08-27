import { DialogProps } from "../../types";
import { IoMdClose } from "react-icons/io";
import Dialog from "./AppDialog";
import { Formik } from "formik";
import FormInput from "../Form/FormInput";
import FormSelectInput from "../Form/FormSelectInput";
import { useAppDispatch } from "../../hooks";
import { createPositionMonitor } from "../../redux/api/positionMonitors";

interface PositionMonitorEditFormData {
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
  positionMonitor: unknown;
}

enum EvaluationMethod {
  VALUE = "VALUE",
  ABS_DISTANCE = "ABS_DISTANCE",
}

const CreatePositionMonitorDialog = ({
  positionMonitor,
  open,
  onClose,
  ...rest
}: EditPositionMonitorDialogProps) => {
  const dispatch = useAppDispatch();

  const handleCreatePositionMonitor = async (
    data: PositionMonitorEditFormData
  ) => {
    dispatch(createPositionMonitor({ data: data }));
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
      <Formik<PositionMonitorEditFormData>
        initialValues={{
          category_name: "",
          evaluation_method: EvaluationMethod.VALUE, // Default to VALUE
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
        {({ handleSubmit, values }) => {
          return (
            <>
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
                <div className="flex justify-between items-center px-3 py-6">
                  <h3 className="text-white/80 font-semibold text-xl">
                    Create Position Monitor
                  </h3>
                  <button
                    onClick={onClose}
                    className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                  >
                    <IoMdClose />
                  </button>
                </div>

                <div className="max-h-[60vh] overflow-auto">
                  <div>
                    <div className="mb-5 p-5 grid grid-cols-2 gap-5">
                      <div className="col-span-2">
                        <FormSelectInput
                          label="Evaluation Method"
                          name="evaluation_method"
                          options={[
                            {
                              label: "PRESET VALUE",
                              value: EvaluationMethod.VALUE,
                            },
                            {
                              label: "ABSOLUTE DISTANCE",
                              value: EvaluationMethod.ABS_DISTANCE,
                            },
                          ]}
                        />
                      </div>

                      {/* Conditionally render fields based on selected evaluation method */}
                      {values.evaluation_method === EvaluationMethod.VALUE && (
                        <div className="col-span-1">
                          <FormInput
                            name="on_value"
                            label="Limit Value"
                            placeholder="Eg: 100,000"
                          />
                        </div>
                      )}

                      {values.evaluation_method ===
                        EvaluationMethod.ABS_DISTANCE && (
                        <div className="col-span-1">
                          <FormInput
                            name="on_abs_distance"
                            label="Absolute Distance"
                            placeholder="Eg: 300"
                          />
                        </div>
                      )}

                      <div className="col-span-1">
                        <FormInput
                          name="base_value"
                          label="Base Value"
                          placeholder="Input a base value"
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
                    className="py-3 px-5 bg-primary rounded-lg text-white shadow-primary"
                    onClick={() => handleSubmit()}
                  >
                    Create Monitor
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

export default CreatePositionMonitorDialog;
