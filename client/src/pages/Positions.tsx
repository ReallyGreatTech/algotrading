import { useEffect, useState } from 'react';
import { AiOutlineExpandAlt } from 'react-icons/ai';
import AppTable from '../components/AppTable';
import InvestorActionsDialog from '../components/Dialogs/InvestorActionsDialog';
import { ExchangeBalance, Investor, Position, Wallet } from '../types';
import {
  exchangesBalanceTableColumn,
  investorTableColumn,
  positionsTableColumn,
  subPositionsTableColumn,
  walletsTableColumn,
} from '../constants/data/positionsPage';
import AddWalletDialog from '../components/Dialogs/AddWalletDialog';
import AddInvestorDialog from '../components/Dialogs/AddInvestorDialog';
import PositionsTableDialog from '../components/Dialogs/PositionsTableDialog';
import PaginationControls from '../components/PaginationControls';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchWallets } from '../redux/api/wallets';
import { fetchInvestors } from '../redux/api/investors';
import { fetchPositions } from '../redux/api/positions';
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const Positions = () => {
  const [investorDialogOpen, setInvestorDialogOpen] = useState(true);
  const [addWalletDialogOpen, setAddWalletDialogOpen] = useState(false);
  const [addInvestorDialogOpen, setAddInvestorDialogOpen] = useState(false);
  const [expandedPosition, setExpandedPosition] = useState<number | undefined>(
    undefined
  );
  const [addPositionsTableDialogOpen, setAddPositionsTableDialogOpen] =
    useState(false);

  const wallets = useAppSelector((state) => state.wallets);
  const investors = useAppSelector((state) => state.investors);
  const positions = useAppSelector((state) => state.positions);

  const dispatch = useAppDispatch();

  const handlePositionsRowExpansion = (item: Position) => {
    if (expandedPosition !== item.id && expandedPosition !== undefined) {
      setExpandedPosition(item.id);
    } else if (expandedPosition === undefined) {
      setExpandedPosition(item.id);
    } else setExpandedPosition(undefined);
  };

  const getExchanges = (wallets: Wallet[]): ExchangeBalance[] => {
    const exchangesBalances: ExchangeBalance[] = [];

    wallets.forEach((w) =>
      w.exchange_balances.forEach((e) => exchangesBalances.push(e))
    );

    return exchangesBalances;
  };

  useEffect(() => {
    dispatch(fetchWallets());
    dispatch(fetchInvestors());
    dispatch(fetchPositions());
  }, []);

  return (
    <section className="min-h-screen pb-10">
      <div className="w-full">
        <div className="py-5">
          <h1 className="text-2xl font-semibold text-white/90">Positions</h1>
        </div>

        <div className="mb-5">
          <div className="grid grid-cols-2 gap-5">
            <div className="col-span-2 lg:col-span-1">
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 h-auto">
                <div className="flex p-5 justify-between items-center ">
                  <h3 className="text-white/90 font-semibold">Wallets</h3>
                  <button
                    className="text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-md"
                    onClick={(e) => {
                      e.stopPropagation();

                      setAddWalletDialogOpen(true);
                    }}
                  >
                    Add Wallet
                  </button>
                </div>

                <div className="overflow-x-auto h-[40vh] max-h-[40vh]">
                  {wallets.loading ? (
                    <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
                      Loading wallets...
                    </div>
                  ) : (
                    <AppTable<Wallet>
                      columns={walletsTableColumn}
                      data={wallets.data}
                    />
                  )}
                </div>
                <PaginationControls />
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1 flex flex-col gap-y-5">
              <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
                <div className="flex p-5 justify-between items-center">
                  <h3 className="text-white/90 font-semibold">Investors</h3>
                  <button
                    className="text-white bg-primary hover:bg-primary/90 px-5 py-2 rounded-md"
                    onClick={() => setAddInvestorDialogOpen(true)}
                  >
                    Add Investor
                  </button>
                </div>

                <div className="overflow-x-auto h-[40vh] max-h-[40vh]">
                  {investors.loading ? (
                    <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
                      Loading investors...
                    </div>
                  ) : (
                    <AppTable<Investor>
                      columns={investorTableColumn}
                      data={investors.data}
                    />
                  )}
                </div>
                <PaginationControls />
              </div>
            </div>
          </div>
        </div>

        <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 mb-5">
          <div className="flex p-5 justify-between items-center">
            <h3 className="text-white/90 font-semibold">Exchange balance</h3>
          </div>

          <div className="overflow-x-auto max-h-[80vh]">
            {positions.loading ? (
              <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
                Loading positions...
              </div>
            ) : (
              <AppTable<ExchangeBalance>
                columns={exchangesBalanceTableColumn}
                data={getExchanges(wallets.data)}
              />
            )}
          </div>
          <PaginationControls />
        </div>

        <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800">
          <div className="flex p-5 justify-between items-center">
            <h3 className="text-white/90 font-semibold">Positions Table</h3>
            <button
              className="text-white p-2 hover:bg-primary-dark rounded-full"
              onClick={() => setAddPositionsTableDialogOpen(true)}
            >
              <AiOutlineExpandAlt />
            </button>
          </div>

          <div className="overflow-x-auto max-h-[80vh]">
            {positions.loading ? (
              <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
                Loading positions...
              </div>
            ) : (
              <AppTable<Position>
                columns={[
                  {
                    label: '',
                    value: 'expand-button',
                    render(item) {
                      return (
                        <button
                          className="p-2 hover:bg-primary-dark rounded-full"
                          onClick={() => handlePositionsRowExpansion(item)}
                        >
                          {item.id === expandedPosition ? (
                            <MdOutlineKeyboardArrowDown />
                          ) : (
                            <MdOutlineKeyboardArrowRight />
                          )}
                        </button>
                      );
                    },
                  },
                  ...positionsTableColumn,
                ]}
                data={positions.data}
                expansionId={expandedPosition}
                expansionProperty={'id'}
                expandComponent={
                  <div className="bg-[#334154] p-5">
                    <div className="border-1 border-white/50 ">
                      <AppTable<Position>
                        tableHeadRowClassName="bg-gray-900"
                        tableBodyRowClassName="bg-[#334154] border-3 border-white/50"
                        columns={subPositionsTableColumn}
                        data={positions.data.slice(-3)}
                      />
                    </div>
                  </div>
                }
              />
            )}
          </div>
          <PaginationControls />
        </div>
      </div>

      <InvestorActionsDialog
        open={investorDialogOpen}
        rootStyle={{ maxWidth: '38em' }}
        onClose={() => setInvestorDialogOpen(false)}
      />

      <AddWalletDialog
        open={addWalletDialogOpen}
        rootStyle={{ maxWidth: '38em' }}
        onClose={() => setAddWalletDialogOpen(false)}
      />

      <AddInvestorDialog
        open={addInvestorDialogOpen}
        rootStyle={{ maxWidth: '38em' }}
        onClose={() => setAddInvestorDialogOpen(false)}
      />

      <PositionsTableDialog
        open={addPositionsTableDialogOpen}
        onClose={() => setAddPositionsTableDialogOpen(false)}
      />
    </section>
  );
};

export default Positions;
