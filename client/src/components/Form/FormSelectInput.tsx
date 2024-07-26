
import { FormikProps, useFormikContext } from "formik";
import SelectInput, { SelectInputProps } from "../SelectInput";

interface FormSelectInputProps extends SelectInputProps {
  name: string;
}

const FormSelectInput = <T extends Record<string, unknown>>({
  name,
  ...rest
}: FormSelectInputProps) => {
  const { values, handleChange }: FormikProps<T> = useFormikContext();

  return (
    <SelectInput
      {...rest}
      name={name}
      value={values[name] as string }
      onChange={handleChange(name)}
    />
  );
};

export default FormSelectInput;
