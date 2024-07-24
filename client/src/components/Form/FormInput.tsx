import Input, { InputProps } from '../Input';
import { FormikProps, useFormikContext } from 'formik';

interface FormInputProps extends InputProps {
  name: string;
}

const FormInput = <T extends Record<string, unknown>>({
  name,
  ...rest
}: FormInputProps) => {
  const { values, handleChange }: FormikProps<T> = useFormikContext();

  return (
    <Input
      {...rest}
      name={name}
      value={values[name] as string | number}
      onChange={handleChange(name)}
    />
  );
};

export default FormInput;
