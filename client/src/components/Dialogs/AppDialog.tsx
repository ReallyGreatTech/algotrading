import Overlay from '../Overlay';
import { DialogProps } from '../../types';

const AppDialog = ({
  open,
  onClose,
  maxWidth = 'sm',
  fullWidth = false,
  children,
}: DialogProps) => {
  const rootMaxWidth = 'max-w-' + maxWidth;

  return (
    <Overlay
      onClose={onClose}
      open={open}
      rootClassName={`p-5 lg:p-0 w-${
        fullWidth ? 'full' : 'auto'
      } ${rootMaxWidth}`}
    >
      {children}
    </Overlay>
  );
};

export default AppDialog;
