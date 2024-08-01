import {
  DialogProps,
  MarketOption,
  NewPositionsFormData,
  Wallet,
} from '../../types';
import { IoMdClose } from 'react-icons/io';
import Dialog from './AppDialog';
import { useEffect, useMemo, useState } from 'react';
import { apiClient } from '../../redux/api/apiClient';
import { Position } from '../../types';
import { Formik } from 'formik';
import { toast } from 'react-toastify';
import FormInput from '../Form/FormInput';
import FormSubmitButton from '../Form/FormSubmitButton';
import FormSelectInput from '../Form/FormSelectInput';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchMarketOptions } from '../../redux/api/marketsOptions';

interface AddPositionsDialogProps extends DialogProps {}

const AddPositionsDialog = ({
  open,
  onClose,
  ...rest
}: AddPositionsDialogProps) => {
  const dispatch = useAppDispatch();
  const [isPending, setIsPending] = useState(false);
  const marketOptionsData = useAppSelector((state) => state.marketOptions);
  const walletsData = useAppSelector((state) => state.wallets);
  

  const mapMarketsToOptions = (data: MarketOption[]) => {
    return data?.map((m) => ({
      label: m.display_name,
      value: m.id.toString(),
    }));
  };

  useEffect(() => {
    dispatch(fetchMarketOptions());
  }, [dispatch]);

  const marketOptions = useMemo(() => {
    return mapMarketsToOptions(marketOptionsData.data);
  }, [marketOptionsData.data.length]);

  const mapWalletToOptions = (data: Wallet[]) => {
    return data?.map((w) => ({
      label: w.name,
      value: w.id.toString(),
    }));
  };

  const walletsOptions = useMemo(() => {
    return mapWalletToOptions(walletsData.data);
  }, [walletsData.data.length]);

  const [positionsData] = useState<NewPositionsFormData>({
    opened_at: '',
    closed_at: '',
    status: 'ACTIVE', // Default value
    direction: 'LONG', // Default value
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
    market_id: '',
    wallet: '',
  });

  const handleAddPosition = async (data: NewPositionsFormData) => {
    setIsPending(true);

  // Validate input data
  const isValid = Object.values(data).every(value => value !== undefined && value !== null && value !== '');

    // Validate wallet data
    if (!data.wallet) {
      toast.error('Wallet is required.');
      setIsPending(false);
      return;
    }

  // Check if required fields are defined and have valid values
  const validStatus = ['ACTIVE', 'CLOSED'].includes(data.status || '');
  const validDirection = ['LONG', 'SHORT'].includes(data.direction || '');

  if (!isValid || !validStatus || !validDirection || !data.wallet) {
    toast.error('Please fill in all required fields and provide valid choices.');
    setIsPending(false);
    return;
  }
    
    //  // Handle custom wallet input if provided
    //  const finalWallet = walletsOptions.some((option) => option.value === data.wallet)
    //  ? data.wallet
    //  : walletInput;

   const formattedData = {
     ...data,
    //  wallet: finalWallet,
     opened_at: data.opened_at ? new Date(data.opened_at).toISOString() : '',
     closed_at: data.closed_at ? new Date(data.closed_at).toISOString() : '',
   };

    console.log('formatted data:',formattedData)
    console.log('status:',formattedData)
    console.log('wallet:',formattedData.wallet)

    try {
      // data.opened_at = new Date(data.opened_at).toISOString();

      // if (data.closed_at) {
      //   data.closed_at = new Date(data.closed_at).toISOString();
      // }

      // await apiClient.post<Position>(`/positions/`, data);
      await apiClient.post<Position>(`/positions/`, formattedData);

      toast.success('New position successfully created.');
      // navigate('/positions');
      onClose();
    } catch (err) {
      console.error('Error while creating position:', err);
      toast.error('An error occured while creating the position.');
    } finally {
      setIsPending(false);
    }
  };

  // useEffect(() => {
  //   dispatch(fetchMarketOptions());
  // }, []);

  return (
    <Dialog {...rest} open={open} onClose={onClose} maxWidth="xl">
      <Formik
        initialValues={positionsData}
        onSubmit={(data) => handleAddPosition(data)}
      >
        {() => (
          <>
            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 h-[90vh] px-5 md:px-10 py-2 md:py-5 ">
              <div className="flex justify-between items-center px-1 md:px-3 py-3 md:py-6">
                <h3 className="text-white/80 font-semibold text-xl">
                  Add Position
                </h3>
                <button
                  onClick={onClose}
                  className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                  style={{}}
                >
                  <IoMdClose />
                </button>
              </div>

              <div className="h-[75%] p-2 md:p-4 overflow-y-scroll">
                <div className=" container max-w-3xl mx-auto text-white/90 ">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-white mb-10">
                    <div className="col-span-1">
                      <FormSelectInput
                        label="[Exhange] - Token"
                        name="market_id"
                        placeholder="Enter value here..."
                        options={marketOptions}
                      />
                    </div>
                    <div className="col-span-1">
                      <FormSelectInput
                        label="Wallet"
                        name="wallet"
                        placeholder="Enter value here..."
                        options={walletsOptions}
                      />
                    </div>

                      {/* Custom wallet input */}
                        {/* <div className="col-span-1">
                      <FormInput
                        label="Wallet"
                        name="wallet"
                        placeholder="Enter your wallet data..."
                      />
                    </div> */}


                    <div className="col-span-1 ">
                      <FormInput
                        type="datetime-local"
                        label="Opened At"
                        name="opened_at"
                        placeholder="Enter value here..."
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormInput
                        label="Closed At"
                        name="closed_at"
                        type="datetime-local"
                        placeholder="Enter value here..."
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormSelectInput
                        name="status"
                        label="Status"
                        defaultValue="ACTIVE"
                        options={[
                          { label: 'Active', value: 'ACTIVE' },
                          { label: 'Closed', value: 'CLOSED' },
                        ]}
                      />
                    </div>
                    <div className="col-span-1 ">
                      <FormSelectInput
                        name="direction"
                        label="Direction"
                        defaultValue="LONG"
                        options={[
                          { label: 'Long', value: 'LONG' },
                          { label: 'Short', value: 'SHORT' },
                        ]}
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
                        label="Leveraged Amount"
                        name="leveraged_amount"
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
                        name="wallet_asset"
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
                </div>
              </div>
              <div className="pt-2 flex justify-end w-full md:w-1/2 md:ps-4 pe-4 md:pe:0 gap-2 md:gap-4 md:ms-auto ">
                <button
                  className="py-3 px-5 border-2 border-primary rounded-lg text-white/90 shadow-primary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <FormSubmitButton
                  type='submit'
                  loading={isPending}
                  className={`w-full py-3 px-5 bg-primary rounded-lg text-white shadow-primary ml-auto ${
                    isPending ? 'animate-pulse' : ''
                  }`}
                >
                  Add Position
                </FormSubmitButton>
              </div>
            </div>
            ;
          </>
        )}
      </Formik>
      ;
    </Dialog>
  );
};

export default AddPositionsDialog;
