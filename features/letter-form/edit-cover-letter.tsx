"use client";

import { useState } from "react";
import { View } from "reshaped";

import type { CoverLetter, CoverLetterDetails } from "@/domain";

import { GoalBanner } from "@/features/dashboard/goal-banner";
import { useCoverLetters } from "@/features/persist-storage";

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
  const { coverLetters } = useCoverLetters();
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
      <GoalBanner count={coverLetters.length} />
    </View>
  );
}
