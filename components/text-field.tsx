import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextField as ReshapedTextField } from "reshaped";

export function TextField({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  const { control } = useFormContext();

  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>

      <Controller
        control={control}
        name={name}
        render={({
          field: { name: fieldName, onChange, value, ...fieldProps },
        }) => (
          <ReshapedTextField
            inputAttributes={fieldProps}
            name={fieldName}
            onChange={({ event }) => onChange(event)}
            placeholder={placeholder}
            value={value}
          />
        )}
      />
    </FormControl>
  );
}
