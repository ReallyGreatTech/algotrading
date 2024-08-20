import { DialogProps } from '../../types';
import { IoMdClose } from 'react-icons/io';
import Dialog from './AppDialog';
import { Formik } from 'formik';
import FormInput from '../Form/FormInput';
import FormSelectInput from '../Form/FormSelectInput';

interface PositionMonitorEditFormData {
  category_name: string;
  evaluation_method: string;
  on_field: string;
  base_value: string;
  on_abs_distance: string;
  on_method: string;
  enabled: string;
  category: string;
  subject: string;
}

interface EditPositionMonitorDialogProps extends DialogProps {
  positionMonitor: unknown;
}

const EditPositionMonitorDialog = ({
  positionMonitor,
  open,
  onClose,
  ...rest
}: EditPositionMonitorDialogProps) => {
  //   const dispatch = useAppDispatch();

  const handleUpdateWallet = async (data: unknown) => {
    console.log(data);
    onClose();
  };

  return (
    <Dialog
      {...rest}
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xl"
      rootStyle={{ maxWidth: '43em' }}
    >
      <Formik<PositionMonitorEditFormData>
        initialValues={{
          category_name: '',
          evaluation_method: '',
          on_field: '',
          base_value: '',
          on_abs_distance: '',
          on_method: '',
          enabled: '',
          category: '',
          subject: '',
        }}
        onSubmit={handleUpdateWallet}
      >
        {({ handleSubmit }) => (
          <>
            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
              <div className="flex justify-between items-center px-3 py-6">
                <h3 className="text-white/80 font-semibold text-xl">
                  Edit Wallet
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
                  <div className="mb-5 p-5  grid grid-cols-2 gap-5">
                    <div className="col-span-2">
                      <FormInput
                        autoFocus
                        name="category_name"
                        placeholder="Category Name"
                        label="Input a category name"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="evaluation_method"
                        label="Evaluation Method"
                        placeholder="Add wallet balance"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="on_field"
                        label="On Field"
                        placeholder="Input an on Field"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="base_value"
                        label="Base Value"
                        placeholder="Input a base value"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="on_abs_distance"
                        label="On Abs Value"
                        placeholder="Enter On Abs Value"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="on_method"
                        label="On Method"
                        placeholder="Enter On Method"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormSelectInput
                        label="Enabled?"
                        name="enabled"
                        options={[
                          { label: 'Enabled', value: 1 },
                          { label: 'Disabled', value: 0 },
                        ]}
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="category"
                        label="Category"
                        placeholder="Enter Category"
                      />
                    </div>
                    <div className="col-span-1">
                      <FormInput
                        name="subject"
                        label="Subject"
                        placeholder="Enter subject"
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
                    true ? 'animate-pulse' : 'animate-none'
                  }`}
                  onClick={() => handleSubmit()}
                >
                  {true ? 'Updating...' : 'Update Wallet'}
                </button>
              </div>
            </div>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditPositionMonitorDialog;
