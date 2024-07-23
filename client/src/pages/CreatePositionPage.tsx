import { useEffect, useState } from 'react';
import Input from '../components/Input';
import { apiClient } from '../redux/api/apiClient';
import { EditPositionsFormData, Position } from '../types';
import { Formik } from 'formik';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreatePositionPage = () => {
  const { id: positionsId } = useParams();
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
    } catch (err) {
      console.log('Someting went wrong');
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
            <div className="text-xs opacity-75 text-white text-center">
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
              {({ handleSubmit, values, handleChange }) => (
                <>
                  <div className="grid grid-cols-2 gap-5 text-white mb-10">
                    <div className="col-span-2">
                      <Input
                        disabled
                        label="Wallet"
                        name="wallet"
                        placeholder="Enter value here..."
                        value={values.wallet}
                      />
                    </div>

                    <div className="col-span-1 ">
                      <Input
                        disabled
                        label="Opened At"
                        name="opened_at"
                        placeholder="Enter value here..."
                        value={values.opened_at}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Closed At"
                        name="opened_at"
                        placeholder="Enter value here..."
                        value={values.closed_at}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Status"
                        name="status"
                        placeholder="Enter value here..."
                        value={values.status}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Direction"
                        name="direction"
                        placeholder="Enter value here..."
                        value={values.direction}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Leverage"
                        name="leverage"
                        placeholder="Enter value here..."
                        value={values.leverage}
                        onChange={handleChange('leverage')}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Leverage Amount"
                        name="leverage_amount"
                        placeholder="Enter value here..."
                        onChange={handleChange('leverage_amount')}
                        value={values.leveraged_amount}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Position Size"
                        name="position_size"
                        placeholder="Enter value here..."
                        value={values.position_size}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Entry Price"
                        name="entry_price"
                        placeholder="Enter value here..."
                        value={values.entry_price}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Liquidation Price"
                        name="liquidation_price"
                        placeholder="Enter value here..."
                        value={values.liquidation_price}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Stop Loss"
                        name="stop_loss"
                        placeholder="Enter value here..."
                        value={values.stop_loss}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Take Profit"
                        name="take_profit"
                        placeholder="Enter value here..."
                        value={values.take_profit}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Roi Percent"
                        name="roi_percent"
                        placeholder="Enter value here..."
                        value={values.roi_percent}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Unrealized PNL"
                        name="unrealized_pnl"
                        placeholder="Enter value here..."
                        value={values.unrealized_pnl}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Wallet Asset"
                        name="unrealized_pnl"
                        placeholder="Enter value here..."
                        value={values.unrealized_pnl}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Account Balance"
                        name="account_balance"
                        placeholder="Enter value here..."
                        value={values.account_balance}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <Input
                        label="Equity"
                        name="equity"
                        placeholder="Enter value here..."
                        value={values.equity}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end w-full md:w-1/2">
                    <button
                      className={`w-full py-3 px-5 bg-primary rounded-lg text-white shadow-primary ml-auto ${
                        isPending ? 'animate-pulse' : ''
                      }`}
                      type="submit"
                      onClick={() => handleSubmit()}
                    >
                      {isPending ? 'Updating...' : 'Update'}
                    </button>
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

export default CreatePositionPage;
