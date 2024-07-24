import { useFormikContext } from 'formik';
import { ButtonHTMLAttributes } from 'react';

interface FormSubmitButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const FormSubmitButton = ({
  loading = false,
  children,
  type = 'submit',
  ...rest
}: FormSubmitButton) => {
  const { handleSubmit } = useFormikContext();

  return (
    <button {...rest} onClick={() => handleSubmit()}>
      {loading ? 'Please wait...' : <>{children}</>}
    </button>
  );
};

export default FormSubmitButton;
