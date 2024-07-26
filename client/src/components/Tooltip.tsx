import { ReactNode, useState } from 'react';

interface TooltipProps {
  text: ReactNode;
  children: ReactNode;
}

const Tooltip = ({ text, children }: TooltipProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 w-max bg-gray-800 text-white text-sm rounded py-1 px-2">
          <div className="max-w-40 text-xs p-1 opacity-90">{text}</div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
