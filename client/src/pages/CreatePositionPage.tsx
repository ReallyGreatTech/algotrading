import { useState } from 'react';
import { apiClient } from '../redux/api/apiClient';
import { EditPositionsFormData, Position } from '../types';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../components/Form/FormInput';
import FormSubmitButton from '../components/Form/FormSubmitButton';
// import SelectInput from '../components/SelectInput';
import FormSelectInput from '../components/Form/FormSelectInput';

const CreatePositionPage = () => {
  const navigate = useNavigate();

  const [isPending, setIsPending] = useState(false);

  const [positionsData] = useState<EditPositionsFormData>({
    opened_at: '',
    closed_at: '',
    status: '',
    direction: '',
    leverage: '',
    leveraged_amount: '',
    position_size: '',
    entry_price: '',
    liquidation_price: '',
    stop_loss: '',
    take_profit: '',
    roi_percent: '',
    unrealized_pnl: '',
    wallet_asset: '',
    account_balance: '',
    equity: '',
    wallet: 0,
  });

  const handleAddPosition = async (data: EditPositionsFormData) => {
    setIsPending(true);
    try {
      await apiClient.post<Position>(`/positions/`, data);

      toast.success('Position was updated successfully.');
      navigate('/positions');
    } catch (err) {
      toast.error('An error occured while creating the given position.');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className="py-10">
      <div className="container max-w-3xl mx-auto text-white/90">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold">New Position</h1>
        </div>

        <>
          <Formik
            initialValues={positionsData}
            onSubmit={(data) => handleAddPosition(data)}
          >
            {() => (
              <>
                <div className="grid grid-cols-2 gap-5 text-white mb-10">
                  <div className="col-span-2">
                    <FormInput
                      label="Wallet"
                      name="wallet"
                      placeholder="Enter value here..."
                    />
                  </div>

                  <div className="col-span-1 ">
                    <FormInput
                      label="Opened At"
                      name="opened_at"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Closed At"
                      name="closed_at"
                      type="date"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    {/* <FormInput
                      label="Status"
                      name="status"
                      placeholder="Enter value here..."
                    /> */}
                    <FormSelectInput
                      name="status"
                      label="Status"
                      options={[
                        { label: 'Active', value: 'ACTIVE' },
                        { label: 'Closed', value: 'CLOSED' },
                      ]}
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Direction"
                      name="direction"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Leverage"
                      name="leverage"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Leverage Amount"
                      name="leverage_amount"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Position Size"
                      name="position_size"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Entry Price"
                      name="entry_price"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Liquidation Price"
                      name="liquidation_price"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Stop Loss"
                      name="stop_loss"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Take Profit"
                      name="take_profit"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Roi Percent"
                      name="roi_percent"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Unrealized PNL"
                      name="unrealized_pnl"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Wallet Asset"
                      name="unrealized_pnl"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Account Balance"
                      name="account_balance"
                      placeholder="Enter value here..."
                    />
                  </div>
                  <div className="col-span-1 ">
                    <FormInput
                      label="Equity"
                      name="equity"
                      placeholder="Enter value here..."
                    />
                  </div>
                </div>

                <div className="flex justify-end w-full md:w-1/2">
                  <FormSubmitButton
                    loading={isPending}
                    className={`w-full py-3 px-5 bg-primary rounded-lg text-white shadow-primary ml-auto ${
                      isPending ? 'animate-pulse' : ''
                    }`}
                  >
                    Add Position
                  </FormSubmitButton>
                </div>
              </>
            )}
          </Formik>
        </>
      </div>
    </section>
  );
};

export default CreatePositionPage;
