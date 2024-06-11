import { HTMLAttributes, useEffect } from 'react';

interface OverLayProps extends HTMLAttributes<HTMLDivElement> {
  closeOnClick?: boolean;
  closeOnEscape?: boolean;
  rootClassName?: string;
  open?: boolean;
  onClose?(): void;
}

const Overlay = ({
  children,
  onClose,
  open = false,
  rootClassName,
}: OverLayProps) => {
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (onClose) onClose();
      }
    });
  }, []);

  return (
    open && (
      <div
        className="fixed top-0 bottom-0 right-0 left-0 w-full h-screen bg-black/60 flex items-center justify-center"
        onClick={onClose}
      >
        <div
          className={`${rootClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    )
  );
};

export default Overlay;
