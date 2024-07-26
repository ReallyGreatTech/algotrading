import { useEffect, useState } from 'react';
import { apiClient } from '../redux/api/apiClient';
import { EditPositionsFormData, Position } from '../types';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormInput from '../components/Form/FormInput';
import FormSubmitButton from '../components/Form/FormSubmitButton';

const EditPositionPage = () => {
  const { id: positionsId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [positionsData, setPositionsData] = useState<EditPositionsFormData>({
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

  const loadPositionData = async (id: number) => {
    setLoading(true);
    setErrorOccured(false);

    try {
      const { data: position } = await apiClient.get<Position>(
        `/positions/${id}/`
      );

      setPositionsData({
        opened_at: position.opened_at,
        closed_at: position.closed_at,
        status: position.status,
        direction: position.direction,
        leverage: position.leverage?.toString(),
        leveraged_amount: position.leveraged_amount?.toString(),
        position_size: position.position_size?.toString(),
        entry_price: position.position_size?.toString(),
        liquidation_price: position.liquidation_price?.toString(),
        stop_loss: position.stop_loss?.toString(),
        take_profit: position.take_profit?.toString(),
        roi_percent: position.roi_percent?.toString(),
        unrealized_pnl: position.unrealized_pnl?.toString(),
        wallet_asset: position.wallet_asset?.toString(),
        account_balance: position.account_balance?.toString(),
        equity: position.equity?.toString(),
        wallet: position.wallet,
      });
    } catch (err) {
      setErrorOccured(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePosition = async (
    id: number,
    data: EditPositionsFormData
  ) => {
    setIsPending(true);
    try {
      await apiClient.patch<Position>(`/positions/${id}/`, data);

      toast.success('Position was updated successfully.');
      navigate('/positions');
    } catch (err) {
      toast.error('Could not update the give position.');
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    loadPositionData(Number(positionsId));
  }, []);

  return (
    <section className="py-10">
      <div className="container max-w-3xl mx-auto text-white/90">
        <div className="mb-10">
          <h1 className="text-2xl font-semibold">Edit Position</h1>
        </div>

        <>
          {loading ? (
            <div className="text-xs opacity-75 text-white text-center animate-pulse">
              Loading...
            </div>
          ) : errorOccured ? (
            <div className="text-xs opacity-75 text-red-500 text-center">
              Something went wrong.
            </div>
          ) : (
            <Formik
              initialValues={positionsData}
              onSubmit={(data) =>
                handleUpdatePosition(Number(positionsId), data)
              }
              enableReinitialize
            >
              {() => (
                <>
                  <div className="grid grid-cols-2 gap-5 text-white mb-10">
                    <div className="col-span-2">
                      <FormInput
                        disabled
                        label="Wallet"
                        name="wallet"
                        placeholder="Enter value here..."
                      />
                    </div>

                    <div className="col-span-1 ">
                      <FormInput
                        disabled
                        label="Opened At"
                        name="opened_at"
                        placeholder="Enter value here..."
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormInput
                        label="Closed At"
                        name="opened_at"
                        placeholder="Enter value here..."
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormInput
                        label="Status"
                        name="status"
                        placeholder="Enter value here..."
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
                      Update
                    </FormSubmitButton>
                  </div>
                </>
              )}
            </Formik>
          )}
        </>
      </div>
    </section>
  );
};

export default EditPositionPage;
