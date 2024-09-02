import { FormikProps, useFormikContext } from 'formik';
import SelectInput, { SelectInputProps } from '../SelectInput';
import { useEffect } from 'react';

interface FormSelectInputProps extends SelectInputProps {
  name: string;
  defaultValue?: string;
}

const FormSelectInput = <T extends Record<string, unknown>>({
  name,
  defaultValue = '',
  ...rest
}: FormSelectInputProps) => {
  const { values, handleChange, setFieldValue }: FormikProps<T> =
    useFormikContext();

  useEffect(() => {
    if (!values[name]) setFieldValue(name, defaultValue);
  }, []);

  return (
    <SelectInput
      {...rest}
      name={name}
      value={values[name] as string}
      onChange={handleChange(name)}
    />
  );
};

export default FormSelectInput;
