import {
  DialogProps,
  EditPositionGroupMonitorData,
  
  PositionsGroup,
} from "../../types";
import { IoMdClose } from "react-icons/io";
import Dialog from "./AppDialog";
import { Formik } from "formik";
import FormInput from "../Form/FormInput";
import FormSelectInput from "../Form/FormSelectInput";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { formatNumber } from "../../utils/formatNumbers";
import { createPositionGroupMonitor } from "../../redux/api/positionGroupMonitors";

interface CreatePositionsGroupMonitorDialogProps extends DialogProps {
  position: PositionsGroup;
  onField: keyof PositionsGroup;
  fieldLabel: string;
}

enum EvaluationMethod {
  VALUE = "VALUE",
  METHOD = "METHOD",
  ABS_DISTANCE = "ABS_DISTANCE",
}

const CreatePositionGroupMonitor = ({
  position,
  open,
  onField,
  fieldLabel,
  onClose,
  ...rest
}: CreatePositionsGroupMonitorDialogProps) => {
  //   const dispatch = useAppDispatch();
  const { isPending } = useAppSelector((state) => state.positionGroupMonitors);

  const dispatch = useAppDispatch();
  // const selectedPosition = useAppSelector((state) => state.subPositions.selectedPosition)

  const shapeMonitorPayload = (
    data: EditPositionGroupMonitorData
  ): EditPositionGroupMonitorData => {
    const dataClone = { ...data };
    let field: keyof EditPositionGroupMonitorData;

    for (field in data) {
      if (!data[field]) delete dataClone[field];
    }

    const _enabled = data.enabled as string | boolean;

    if (typeof _enabled === "string") {
      if (_enabled === "true") data.enabled = true;
      else if (_enabled === "false") data.enabled = false;
    }

    dataClone.on_field = onField;
    

    return dataClone;
  };

  const handleCreatePositionGroupMonitor = async (
    data: EditPositionGroupMonitorData
  ) => {
    console.log("Create Positions Monitor Data", data);

    await dispatch(createPositionGroupMonitor({ data: shapeMonitorPayload(data) }));

    onClose();
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
          evaluation_method: EvaluationMethod.VALUE,
          on_field: `${formatNumber(Number(onField))}`,
          base_value: `${formatNumber(Number(position[onField]))}`,
          on_value: "",
          on_abs_distance: `${formatNumber(Number(position[onField]))}`,
          enabled: true,
          token: position.token
         
        }}
        onSubmit={handleCreatePositionGroupMonitor}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
                <div className="flex justify-between items-center px-3 py-6">
                  <div>
                    <h3 className="text-white/80 font-semibold text-xl mb-3">
                      Create Position Group Monitor
                    </h3>
                    <p className="text-xs">
                      This monitor will be created for{" "}
                      <span className="font-bold text-primary">
                        {fieldLabel}
                      </span>
                    </p>
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
                    {isPending ? "Creating Monitor" : "Create Monitor"}
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

export default CreatePositionGroupMonitor;
