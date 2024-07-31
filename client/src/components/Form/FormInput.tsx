import { formatDateTimeLocal } from '../../utils/formatTime';
import Input, { InputProps } from '../Input';
import { FormikProps, useFormikContext } from 'formik';

interface FormInputProps extends InputProps {
  name: string;
}

const FormInput = <T extends Record<string, unknown>>({
  name,
  type,
  ...rest
}: FormInputProps) => {
  const { values, handleChange }: FormikProps<T> = useFormikContext();

  const value =
    type === 'datetime-local'
      ? formatDateTimeLocal(new Date(values[name] as string))
      : values[name];

  return (
    <Input
      {...rest}
      name={name}
      type={type}
      value={value as string | number}
      onChange={handleChange(name)}
    />
  );
};

export default FormInput;
