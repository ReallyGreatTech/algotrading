import { useEffect, useState } from "react";
import { apiClient } from "../../redux/api/apiClient";
import { DialogProps, EditPositionsFormData, Position } from "../../types";
import { Formik } from "formik";
import { toast } from "react-toastify";
import FormInput from "../Form/FormInput";
import FormSubmitButton from "../Form/FormSubmitButton";
import FormSelectInput from "../Form/FormSelectInput";
import Dialog from "./AppDialog";
import { IoMdClose } from "react-icons/io";

interface EditPositionsDialogProps extends DialogProps {
  positionId: number | undefined;
}

const EditPositionsDialog = ({
  open,
  positionId,
  onClose,
  ...rest
}: EditPositionsDialogProps) => {
  const [loading, setLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [errorOccured, setErrorOccured] = useState(false);
  const [positionsData, setPositionsData] = useState<EditPositionsFormData>({
    opened_at: "",
    closed_at: "",
    status: "",
    direction: "",
    leverage: "",
    leveraged_amount: "",
    position_size: "",
    entry_price: "",
    liquidation_price: "",
    stop_loss: "",
    take_profit: "",
    roi_percent: "",
    unrealized_pnl: "",
    wallet_asset: "",
    account_balance: "",
    equity: "",
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

      toast.success("Position was updated successfully.");
      onClose();
    } catch (err) {
      toast.error("Could not update the give position.");
    } finally {
      setIsPending(false);
    }
  };

  useEffect(() => {
    if (positionId) loadPositionData(positionId);
  }, [positionId]);

  return (
    <Dialog {...rest} open={open} onClose={onClose} maxWidth="xl">
      <Formik
        initialValues={positionsData}
        onSubmit={(data) => handleUpdatePosition(positionId as number, data)}
        enableReinitialize
      >
        {() => (
          <>
            <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 h-[90vh] px-5 md:px-10 py-2 md:py-5 ">
              <div className="flex justify-between items-center px-1 md:px-3 py-3 md:py-6">
                <h3 className="text-white/80 font-semibold text-xl">
                  Edit Position
                </h3>
                <button
                  onClick={onClose}
                  className="p-4 rounded-lg border-2 border-primary bg-[#121C2D] text-white shadow-primary"
                >
                  <IoMdClose />
                </button>
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
                  <section className="h-[75%] p-2 md:p-4 overflow-y-scroll">
                    <div className="grid grid-cols-2 gap-5 text-white mb-10  ">
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
                          name="closed_at"
                          placeholder="Enter value here..."
                        />
                      </div>
                      <div className="col-span-1 ">
                        <FormSelectInput
                          name="status"
                          label="Status"
                          defaultValue="ACTIVE"
                          options={[
                            { label: "Active", value: "ACTIVE" },
                            { label: "Closed", value: "CLOSED" },
                          ]}
                        />
                      </div>
                      <div className="col-span-1 ">
                        <FormSelectInput
                          name="direction"
                          label="Direction"
                          defaultValue="LONG"
                          options={[
                            { label: "Long", value: "LONG" },
                            { label: "Short", value: "SHORT" },
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

                    <div className="flex justify-end w-full md:w-1/2">
                      <FormSubmitButton
                        loading={isPending}
                        className={`w-full py-3 px-5 bg-primary rounded-lg text-white shadow-primary ml-auto ${
                          isPending ? "animate-pulse" : ""
                        }`}
                      >
                        Update
                      </FormSubmitButton>
                    </div>
                  </section>
                )}
              </>
            </div>
          </>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditPositionsDialog;
