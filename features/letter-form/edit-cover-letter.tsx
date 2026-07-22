"use client";

import { useState } from "react";
import { View } from "reshaped";

import type { CoverLetter, CoverLetterDetails } from "@/domain";

import { Goal } from "@/features/goal";
import { CreateNewButton } from "@/ui/create-new-button";

import { FormPreviewShell } from "./form-preview-shell";
import { LetterForm } from "./letter-form";
import { LetterPreview } from "./letter-preview";

type EditCoverLetterProps = {
  coverLetter: CoverLetter;
  generateCoverLetter?: (details: CoverLetterDetails) => Promise<CoverLetter>;
};

export function EditCoverLetter({
  coverLetter,
  generateCoverLetter,
}: EditCoverLetterProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewContent, setPreviewContent] = useState(coverLetter.content);

  return (
    <View gap={8}>
      <FormPreviewShell
        form={
          <LetterForm
            existingCoverLetter={coverLetter}
            generateCoverLetter={generateCoverLetter}
            initialDetails={coverLetter.details}
            onGenerated={(letter) => setPreviewContent(letter.content)}
            onGeneratingChange={setIsGenerating}
            submitLabel="Try Again"
          />
        }
        preview={
          <LetterPreview content={previewContent} isGenerating={isGenerating} />
        }
      />
      <Goal.Root>
        <Goal.Banner action={<CreateNewButton size="large" />} />
      </Goal.Root>
    </View>
  );
}
