import { useEffect, useState } from "react";
import { AiOutlineExpandAlt } from "react-icons/ai";
import AppTable from "../components/AppTable";
import InvestorActionsDialog from "../components/Dialogs/InvestorActionsDialog";
import {
  ExchangeBalance,
  Investor,
  Position,
  PositionsGroup,
  Wallet,
} from "../types";
import {
  exchangesBalanceTableColumn,
  investorTableColumn,
  positionGroupsTableColumn,
  subPositionsTableColumn,
  walletsTableColumn,
} from "../constants/data/positionsPage";
import AddWalletDialog from "../components/Dialogs/AddWalletDialog";
import AddInvestorDialog from "../components/Dialogs/AddInvestorDialog";
import PositionsTableDialog from "../components/Dialogs/PositionsTableDialog";
import PaginationControls from "../components/PaginationControls";
import { useAppDispatch, useAppSelector } from "../hooks";
import { fetchWallets } from "../redux/api/wallets";
import { fetchInvestors } from "../redux/api/investors";
import { fetchPositions, fetchSubPositions } from "../redux/api/positions";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { fetchInvestorActions } from "../redux/api/investorActions";
import AddPositionsDialog from "../components/Dialogs/AddPositionsDialog";
import EditPositionsDialog from "../components/Dialogs/EditPostionsDialog";
import { FiEdit2 } from "react-icons/fi";
import { selectPosition } from "../redux/features/sub_positions/sub-positions";
import CreatePositionMonitorDialog from "../components/Dialogs/CreatePositionMonitorDialog";
import { useNavigate } from "react-router-dom";

const Positions = () => {
  const [investorDialogOpen, setInvestorDialogOpen] = useState(false);
  const [addWalletDialogOpen, setAddWalletDialogOpen] = useState(false);
  const [addInvestorDialogOpen, setAddInvestorDialogOpen] = useState(false);
  const [addPositionDialogOpen, setPositionDialogOpen] = useState(false);
  const [editPositionDialogOpen, setEditPositionDialogOpen] = useState(false);
  const [editMonitorDialogOpen, setEditMonitorDialogOpen] = useState(false);
  const [expandedPosition, setExpandedPosition] = useState<string | undefined>(
    undefined
  );
  const [addPositionsTableDialogOpen, setAddPositionsTableDialogOpen] =
    useState(false);
  // const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const [isLoggedIn] = useState(true);

  const wallets = useAppSelector((state) => state.wallets);
  const investors = useAppSelector((state) => state.investors);
  const positionGroups = useAppSelector((state) => state.positions);
  const subPositions = useAppSelector((state) => state.subPositions);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handlePositionsRowExpansion = (item: PositionsGroup) => {
    if (expandedPosition !== item.token && expandedPosition !== undefined) {
      dispatch(fetchSubPositions({ token: item.token }));
      setExpandedPosition(item.token);
    } else if (expandedPosition === undefined) {
      dispatch(fetchSubPositions({ token: item.token }));
      setExpandedPosition(item.token);
    } else setExpandedPosition(undefined);
  };

  const handleSelectInvestor = (investor: Investor) => {
    dispatch(fetchInvestorActions({ investor: investor.id }));
    setInvestorDialogOpen(true);
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

  const handleEditDialogClose = () => {
    setEditPositionDialogOpen(false);
  };

  const handleRowClick = (item: Position) => {
    dispatch(selectPosition(item));
    setEditPositionDialogOpen(true);
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

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
                      tableBodyRowClassName="cursor-pointer"
                      onRowClick={handleSelectInvestor}
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
            {wallets.loading ? (
              <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
                Loading exchange balances...
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

        <div className="border-2 border-white/10 overflow-hidden rounded-2xl bg-gray-800 mb-5">
          <div className="flex p-5 justify-between items-center">
            <h3 className="text-white/90 font-semibold">Positions Table</h3>
            <div className="flex gap-5">
              <button
                className="text-white bg-primary hover:bg-primary-dark transition duration-100 ease-in px-5 py-2 rounded-md"
                onClick={(e) => {
                  e.stopPropagation();
                  setPositionDialogOpen(true);
                }}
              >
                New Position
              </button>
              <button
                className="text-white p-2 hover:bg-primary-dark rounded-full"
                onClick={() => setAddPositionsTableDialogOpen(true)}
              >
                <AiOutlineExpandAlt />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto max-h-[80vh]">
            {positionGroups.loading ? (
              <div className="text-sm text-white/90 w-full h-full flex justify-center items-center">
                Loading positions...
              </div>
            ) : (
              <div
                className={`relative overflow-x-auto max-h-[80vh] ${
                  !isLoggedIn ? "overflow-hidden" : ""
                }`}
              >
                {/* Conditional Rendering */}
                {!isLoggedIn && (
                  <div
                    className={`absolute inset-0 right-0 w-full h-full flex items-center justify-center bg-black/50 backdrop-blur-sm z-10`}
                  >
                    <div className="text-center">
                      <p className="text-lg font-base text-white/80 mb-4">
                        Please log in to view positions.
                      </p>
                      <button
                        onClick={handleLoginRedirect}
                        className="px-6 py-2 bg-primary text-white rounded-md shadow-lg hover:bg-primary-dark"
                      >
                        Log In
                      </button>
                    </div>
                  </div>
                )}

                {/* Table Component */}
                <AppTable<PositionsGroup>
                  columns={[
                    {
                      label: "",
                      value: "expand-button",
                      render(item) {
                        return (
                          <button
                            className="p-2 hover:bg-primary-dark rounded-full"
                            onClick={() => handlePositionsRowExpansion(item)}
                          >
                            {item.token === expandedPosition ? (
                              <MdOutlineKeyboardArrowDown />
                            ) : (
                              <MdOutlineKeyboardArrowRight />
                            )}
                          </button>
                        );
                      },
                    },
                    ...positionGroupsTableColumn,
                  ]}
                  data={positionGroups.data}
                  expansionId={expandedPosition}
                  expansionProperty={"token"}
                  expandComponent={
                    <div className="bg-[#334154] p-5">
                      <div className="border-1 border-white/50 ">
                        {subPositions.loading ? (
                          <p className="text-xs text-white/90 py-8">
                            Loading sub positions...
                          </p>
                        ) : (
                          <AppTable<Position>
                            selectedRow={subPositions.selectedPosition}
                            onRowClick={handleRowClick}
                            tableHeadRowClassName="bg-gray-900"
                            tableBodyRowClassName={`bg-[#334154] border-3 border-white/50 hover:cursor-pointer`}
                            columns={[
                              {
                                label: "",
                                value: "",
                                render(position) {
                                  return (
                                    <div>
                                      <button
                                        className="p-2 hover:bg-primary-dark rounded-full text-xs"
                                        onClick={(e) => {
                                          e.stopPropagation();

                                          dispatch(selectPosition(position));
                                          setEditMonitorDialogOpen(true);
                                        }}
                                      >
                                        Open Monitor
                                      </button>
                                    </div>
                                  );
                                },
                              },
                              ...subPositionsTableColumn,
                              {
                                label: "",
                                value: "",
                                render(item) {
                                  return (
                                    <div>
                                      <button
                                        className="p-2 hover:bg-primary-dark rounded-full "
                                        onClick={() => {
                                          dispatch(selectPosition(item));
                                          setEditPositionDialogOpen(true);
                                        }}
                                      >
                                        <FiEdit2 />
                                      </button>
                                    </div>
                                  );
                                },
                              },
                            ]}
                            data={subPositions.data}
                          />
                        )}
                      </div>
                    </div>
                  }
                />
              </div>
            )}
          </div>
          <PaginationControls />
        </div>
      </div>

      <InvestorActionsDialog
        open={investorDialogOpen}
        rootStyle={{ maxWidth: "38em" }}
        onClose={() => setInvestorDialogOpen(false)}
      />

      <AddWalletDialog
        open={addWalletDialogOpen}
        rootStyle={{ maxWidth: "38em" }}
        onClose={() => setAddWalletDialogOpen(false)}
      />

      <AddInvestorDialog
        open={addInvestorDialogOpen}
        rootStyle={{ maxWidth: "38em" }}
        onClose={() => setAddInvestorDialogOpen(false)}
      />

      <PositionsTableDialog
        open={addPositionsTableDialogOpen}
        onClose={() => setAddPositionsTableDialogOpen(false)}
      />
      <AddPositionsDialog
        open={addPositionDialogOpen}
        onClose={() => setPositionDialogOpen(false)}
      />
      <EditPositionsDialog
        positionId={subPositions.selectedPosition?.id}
        open={editPositionDialogOpen}
        onClose={handleEditDialogClose}
      />

      <CreatePositionMonitorDialog
        positionMonitor={null}
        open={editMonitorDialogOpen}
        onClose={() => {
          setEditMonitorDialogOpen(false);
        }}
      />
    </section>
  );
};

export default Positions;
