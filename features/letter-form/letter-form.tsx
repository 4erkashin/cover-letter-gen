"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  Button,
  FormControl,
  HiddenVisually,
  TextArea,
  TextField,
  View,
  useToast,
} from "reshaped";

import {
  overwriteCoverLetter,
  type CoverLetter,
  type CoverLetterDetails,
} from "@/domain";
import {
  saveCoverLetter,
  updateCoverLetter,
} from "@/features/persist-storage";
import { CharCounter } from "@/ui/char-counter";
import { FormHeader } from "@/ui/form-header";
import { GENERATING_STATUS } from "@/ui/letter-preview";

import { ADDITIONAL_DETAILS_MAX } from "./constants";
import { generateCoverLetter as defaultGenerateCoverLetter } from "./generate-cover-letter";
import {
  isAdditionalDetailsOverLimit,
  isCoverLetterDetailsValid,
} from "./validation";

const EMPTY_DETAILS: CoverLetterDetails = {
  jobTitle: "",
  companyName: "",
  skills: "",
  additionalDetails: "",
};

type LetterFormProps = {
  generateCoverLetter?: (
    details: CoverLetterDetails,
  ) => Promise<CoverLetter>;
  onGeneratingChange?: (isGenerating: boolean) => void;
  onGenerated?: (letter: CoverLetter) => void;
  submitLabel?: string;
  initialDetails?: CoverLetterDetails;
  /** When set, Try Again overwrites this id and stays on the page. */
  existingCoverLetter?: Pick<CoverLetter, "id" | "createdAt">;
};

export function LetterForm({
  generateCoverLetter = defaultGenerateCoverLetter,
  onGeneratingChange,
  onGenerated,
  submitLabel = "Generate Now",
  initialDetails = EMPTY_DETAILS,
  existingCoverLetter,
}: LetterFormProps) {
  const router = useRouter();
  const { show } = useToast();
  const [details, setDetails] = useState<CoverLetterDetails>(initialDetails);
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const detailsOverLimit = isAdditionalDetailsOverLimit(
    details.additionalDetails,
  );
  const isValid = isCoverLetterDetailsValid(details);
  const isEdit = existingCoverLetter != null;

  const updateField =
    (field: keyof CoverLetterDetails) =>
    ({ value }: { value: string }) => {
      setDetails((current) => ({ ...current, [field]: value }));
    };

  const setGenerating = (next: boolean) => {
    setIsGenerating(next);
    onGeneratingChange?.(next);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || isGenerating) {
      return;
    }

    setGenerating(true);
    setStatusMessage(GENERATING_STATUS);
    try {
      const generated = await generateCoverLetter(details);
      if (isEdit) {
        const letter = overwriteCoverLetter(existingCoverLetter, generated);
        updateCoverLetter(letter);
        setStatusMessage("Cover letter generated.");
        onGenerated?.(letter);
        setGenerating(false);
        return;
      }
      saveCoverLetter(generated);
      setStatusMessage("Cover letter generated.");
      onGenerated?.(generated);
      // Keep busy until navigation unmounts — avoids empty-preview flash.
      router.replace(`/${generated.id}`);
    } catch {
      // Stay on the page with the form intact; nothing persisted.
      setStatusMessage(
        "Generation failed. Could not generate the letter.",
      );
      show({
        color: "critical",
        position: "bottom-end",
        title: "Generation failed",
        text: "Could not generate the letter. Try again later.",
      });
      setGenerating(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <View gap={4}>
        <FormHeader
          jobTitle={details.jobTitle}
          companyName={details.companyName}
        />

        <View direction="row" gap={4}>
          <View.Item columns={6}>
            <FormControl>
              <FormControl.Label>Job title</FormControl.Label>
              <TextField
                name="jobTitle"
                placeholder="Product manager"
                value={details.jobTitle}
                onChange={updateField("jobTitle")}
              />
            </FormControl>
          </View.Item>

          <View.Item columns={6}>
            <FormControl>
              <FormControl.Label>Company</FormControl.Label>
              <TextField
                name="companyName"
                placeholder="Apple"
                value={details.companyName}
                onChange={updateField("companyName")}
              />
            </FormControl>
          </View.Item>
        </View>

        <FormControl>
          <FormControl.Label>I am good at…</FormControl.Label>
          <TextField
            name="skills"
            placeholder="HTML, CSS and doing things in time"
            value={details.skills}
            onChange={updateField("skills")}
          />
        </FormControl>

        <FormControl hasError={detailsOverLimit}>
          <FormControl.Label>Additional details</FormControl.Label>
          <TextArea
            name="additionalDetails"
            placeholder="Describe why you are a great fit or paste your bio"
            value={details.additionalDetails}
            onChange={updateField("additionalDetails")}
            resize="auto"
            hasError={detailsOverLimit}
            inputAttributes={{
              "aria-invalid": detailsOverLimit,
            }}
          />
          <FormControl.Helper>
            <CharCounter
              length={details.additionalDetails.length}
              max={ADDITIONAL_DETAILS_MAX}
            />
          </FormControl.Helper>
        </FormControl>

        <Button
          type="submit"
          color="positive"
          variant="solid"
          fullWidth
          size="large"
          disabled={!isValid || isGenerating}
          loading={isGenerating}
          loadingAriaLabel={GENERATING_STATUS}
          attributes={
            isGenerating ? { "aria-label": GENERATING_STATUS } : undefined
          }
        >
          {submitLabel}
        </Button>

        <HiddenVisually>
          <div role="status" aria-live="polite">
            {statusMessage}
          </div>
        </HiddenVisually>
      </View>
    </form>
  );
}
