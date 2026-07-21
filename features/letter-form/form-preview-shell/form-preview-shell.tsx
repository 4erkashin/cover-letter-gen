import type { ReactNode } from "react";

import { Grid } from "reshaped";

type FormPreviewShellProps = {
  form: ReactNode;
  preview: ReactNode;
};

export function FormPreviewShell({ form, preview }: FormPreviewShellProps) {
  return (
    <Grid align="start" columns={{ m: 2, s: 1 }} gap={6}>
      <Grid.Item>{form}</Grid.Item>
      <Grid.Item>{preview}</Grid.Item>
    </Grid>
  );
}
