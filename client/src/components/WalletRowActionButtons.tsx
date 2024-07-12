import { Wallet } from "../types";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useAppDispatch } from "../hooks";
import { useState } from "react";
import { deleteWallet } from "../redux/api/wallets";

interface WalletRowActionButtonsProps {
  wallet: Wallet;
}

const WalletRowActionButtons = ({ wallet }: WalletRowActionButtonsProps) => {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const handleDeleteWallet = async () => {
    setDeleting(true);
    await dispatch(deleteWallet(wallet.id));
    setDeleting(false);
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={() => {
          console.log("Editing: ", wallet);
        }}
        className="p-1 hover:bg-primary-dark rounded-full"
      >
        <FiEdit2 />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();

          handleDeleteWallet();
        }}
        className={`p-1 hover:bg-primary-dark rounded-full ${
          deleting ? "animate-spin" : ""
        }`}
      >
        <RiDeleteBin5Line />
      </button>
    </div>
  );
};

export default WalletRowActionButtons;
