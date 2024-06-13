import Overlay from '../Overlay';
import { DialogProps } from '../../types';

const AppDialog = ({
  open,
  onClose,
  maxWidth,
  fullWidth = false,
  children,
}: DialogProps) => {
  const rootMaxWidth = 'max-w-' + (maxWidth || 'lg');
  const rootClassName = `p-5 lg:p-0 w-${
    fullWidth ? 'full' : 'auto'
  } ${rootMaxWidth}`;

  return (
    <Overlay onClose={onClose} open={open} rootClassName={rootClassName}>
      <div className={`${maxWidth === 'full' && fullWidth ? 'p-10' : 'p-5'}`}>
        {children}
      </div>
    </Overlay>
  );
};

export default AppDialog;
