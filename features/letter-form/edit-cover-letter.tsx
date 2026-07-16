"use client";

import { useState } from "react";
import { View } from "reshaped";

import type { CoverLetter, CoverLetterDetails } from "@/domain";
import { useCoverLetters } from "@/features/persist-storage";
import { FormPreviewShell } from "@/ui/form-preview-shell";
import { GoalBanner } from "@/ui/goal-banner";
import { LetterPreview } from "@/ui/letter-preview";

import { LetterForm } from "./letter-form";

type EditCoverLetterProps = {
  coverLetter: CoverLetter;
  generateCoverLetter?: (
    details: CoverLetterDetails,
  ) => Promise<CoverLetter>;
};

export function EditCoverLetter({
  coverLetter,
  generateCoverLetter,
}: EditCoverLetterProps) {
  const { coverLetters } = useCoverLetters();
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewContent, setPreviewContent] = useState(coverLetter.content);

  return (
    <View gap={8}>
      <FormPreviewShell
        form={
          <LetterForm
            initialDetails={coverLetter.details}
            existingCoverLetter={coverLetter}
            submitLabel="Try Again"
            generateCoverLetter={generateCoverLetter}
            onGeneratingChange={setIsGenerating}
            onGenerated={(letter) => setPreviewContent(letter.content)}
          />
        }
        preview={
          <LetterPreview
            content={previewContent}
            isGenerating={isGenerating}
          />
        }
      />
      <GoalBanner count={coverLetters.length} />
    </View>
  );
}
