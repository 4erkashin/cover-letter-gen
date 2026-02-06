import { Controller, useFormContext } from "react-hook-form";
import { FormControl, TextArea, TextField } from "reshaped";

export function FormField({
  label,
  name,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  placeholder: string;
  type?: "text" | "textarea";
}) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { name: fieldName, onChange, value, ...fieldProps },
        fieldState,
      }) => (
        <FormControl hasError={!!fieldState.error}>
          <FormControl.Label>{label}</FormControl.Label>

          {type === "text" ? (
            <TextField
              inputAttributes={fieldProps}
              name={fieldName}
              onChange={({ event }) => onChange(event)}
              placeholder={placeholder}
              value={value}
            />
          ) : (
            <TextArea
              inputAttributes={fieldProps}
              name={fieldName}
              onChange={({ event }) => onChange(event)}
              placeholder={placeholder}
              resize="auto"
              value={value}
            />
          )}

          <FormControl.Error>{fieldState.error?.message}</FormControl.Error>
        </FormControl>
      )}
    />
  );
}
