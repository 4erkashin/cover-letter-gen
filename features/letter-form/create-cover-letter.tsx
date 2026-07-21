"use client";

import { useState } from "react";

import type { CoverLetter, CoverLetterDetails } from "@/domain";

import { FormPreviewShell } from "./form-preview-shell";
import { LetterForm } from "./letter-form";
import { LetterPreview } from "./letter-preview";

type CreateCoverLetterProps = {
  generateCoverLetter?: (details: CoverLetterDetails) => Promise<CoverLetter>;
};

export function CreateCoverLetter({
  generateCoverLetter,
}: CreateCoverLetterProps = {}) {
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <FormPreviewShell
      form={
        <LetterForm
          generateCoverLetter={generateCoverLetter}
          onGeneratingChange={setIsGenerating}
        />
      }
      preview={<LetterPreview isGenerating={isGenerating} />}
    />
  );
}
