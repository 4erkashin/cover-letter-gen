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
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>

      <Controller
        control={control}
        name={name}
        render={({
          field: { name: fieldName, onChange, value, ...fieldProps },
        }) =>
          type === "text" ? (
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
          )
        }
      />
    </FormControl>
  );
}
