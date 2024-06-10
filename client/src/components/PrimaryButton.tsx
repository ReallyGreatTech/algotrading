import { ReactNode } from "react";

interface PrimaryButtonProps {
    buttonText: string,
    buttonIcon? : string | ReactNode,
    onClick?: ()=>void
}

const PrimaryButton = ({buttonText, onClick, buttonIcon}:PrimaryButtonProps) => {
  return (
    <button className="p-3 bg-primary rounded-lg flex items-center justify-center gap-2  " onClick={onClick}>
          <span className="text-[14px] font-[400]"> {buttonText} </span> <span className="text-[14px]"> { buttonIcon}</span>
    </button>
  );
}

export default PrimaryButton
