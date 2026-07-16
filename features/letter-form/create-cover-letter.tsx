import { FormPreviewShell } from "@/ui/form-preview-shell";
import { LetterPreview } from "@/ui/letter-preview";

import { LetterForm } from "./letter-form";

export function CreateCoverLetter() {
  return (
    <FormPreviewShell
      form={<LetterForm />}
      preview={<LetterPreview />}
    />
  );
}
