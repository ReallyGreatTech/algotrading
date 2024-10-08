import {
  CreatePositionMonitorFormData,
  DialogProps,
  Position,
} from '../../types';
import { IoMdClose } from 'react-icons/io';
import Dialog from './AppDialog';
import { Formik } from 'formik';
import FormInput from '../Form/FormInput';
import FormSelectInput from '../Form/FormSelectInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createPositionMonitor } from '../../redux/api/position-monitors';

interface EditPositionMonitorDialogProps extends DialogProps {
  position: Position;
  onField: keyof Position;
  fieldLabel: string;
}

enum EvaluationMethod {
  VALUE = 'VALUE',
  METHOD = 'METHOD',
  ABS_DISTANCE = 'ABS_DISTANCE',
}

const EditPositionMonitorDialog = ({
  position,
  open,
  onField,
  fieldLabel,
  onClose,
  ...rest
}: EditPositionMonitorDialogProps) => {
  //   const dispatch = useAppDispatch();
  const { isPending } = useAppSelector((state) => state.positionMonitors);

  const dispatch = useAppDispatch();
  // const selectedPosition = useAppSelector((state) => state.subPositions.selectedPosition)

  const shapeMonitorPayload = (
    data: CreatePositionMonitorFormData
  ): CreatePositionMonitorFormData => {
    const dataClone = { ...data };
    let field: keyof CreatePositionMonitorFormData;

    for (field in data) {
      if (!data[field]) delete dataClone[field];
    }

    const _enabled = data.enabled as string | boolean;

    if (typeof _enabled === 'string') {
      if (_enabled === 'true') data.enabled = true;
      else if (_enabled === 'false') data.enabled = false;
    }

    dataClone.on_field = onField;
    dataClone.subject = position.id;

    return dataClone;
  };

  const handleCreatePositionMonitor = async (
    data: CreatePositionMonitorFormData
  ) => {
    console.log('Create Positions Data', data);

    await dispatch(createPositionMonitor({ data: shapeMonitorPayload(data) }));

    onClose();
  };

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      rootStyle={{ maxWidth: '38em' }}
    >
      <Formik<CreatePositionMonitorFormData>
        initialValues={{
          evaluation_method: EvaluationMethod.VALUE,
          on_field: onField,
          base_value: position[onField]?.toString(),
          on_value: '',
          on_abs_distance: position[onField]?.toString(),
          enabled: true,
          subject: position.id,
        }}
        onSubmit={handleCreatePositionMonitor}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-[#1B222C]">
                <div className="flex justify-between items-center px-3 pt-6">
                  <div>
                    <h3 className="text-white/80 font-semibold text-xl mb-3">
                      Add Monitor
                    </h3>
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
                    <div className="mb-5 px-5  gap-5 ">
                      <div className="col-span-2">
                        <FormSelectInput
                          label="Evaluation Method"
                          name="evaluation_method"
                          options={[
                            {
                              label: 'Value',
                              value: EvaluationMethod.VALUE,
                            },
                            {
                              label: 'Absolue Distance',
                              value: EvaluationMethod.ABS_DISTANCE,
                            },
                          ]}
                        />
                      </div>
                      <div className="border-y my-4 py-3 flex flex-col gap-2 border-gray-600">
                        <h4 className="text-white/80 font-semibold text-lg mb-1">
                          Criteria
                        </h4>
                        <div className="col-span-1">
                          <FormInput
                            name="fieldLabel"
                            label="On field"
                            placeholder={fieldLabel}
                            disabled
                          />
                        </div>
                        <div className="col-span-1">
                          <FormInput
                            name="base_value"
                            label="Current Value"
                            placeholder="Input a base value"
                            disabled
                          />
                        </div>

                        {/* <div className="col-span-2">
                          <FormSelectInput
                            label="Enabled?"
                            name="enabled"
                            options={[
                              { label: "Enabled", value: "true" },
                              { label: "Disabled", value: "false" },
                            ]}
                          />
                        </div> */}
                      </div>
                      <div>
                        <h4 className="text-white/80 font-semibold text-lg mb-3">
                          Notify when
                        </h4>
                        {values.evaluation_method ===
                          EvaluationMethod.VALUE && (
                          <div className="col-span-1">
                            <FormInput
                              name="on_value"
                              label="Projected Value"
                              placeholder="Input a value"
                            />
                          </div>
                        )}
                        {values.evaluation_method ===
                          EvaluationMethod.ABS_DISTANCE && (
                          <div className="col-span-1">
                            <FormInput
                              name="on_abs_distance"
                              label="Project Distance"
                              placeholder="Enter On Abs Distance"
                            />
                          </div>
                        )}
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
                      isPending ? 'animate-pulse' : ''
                    }`}
                    onClick={() => handleSubmit()}
                  >
                    {isPending ? 'Creating Monitor...' : 'Create Monitor'}
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

export default EditPositionMonitorDialog;
