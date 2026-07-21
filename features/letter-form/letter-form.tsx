"use client";

import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  HiddenVisually,
  TextArea,
  TextField,
  useToast,
  View,
} from "reshaped";

import {
  type CoverLetter,
  type CoverLetterDetails,
  overwriteCoverLetter,
} from "@/domain";
import { saveCoverLetter, updateCoverLetter } from "@/features/persist-storage";
import RetryIcon from "@/ui/assets/retry-icon.svg";
import { CharCounter } from "@/ui/char-counter";

import { ADDITIONAL_DETAILS_MAX } from "./constants";
import { FormHeader } from "./form-header";
import { generateCoverLetter as defaultGenerateCoverLetter } from "./generate-cover-letter";
import { GENERATING_STATUS } from "./letter-preview";
import {
  isAdditionalDetailsOverLimit,
  isCoverLetterDetailsValid,
} from "./validation";

const EMPTY_DETAILS: CoverLetterDetails = {
  additionalDetails: "",
  companyName: "",
  jobTitle: "",
  skills: "",
};

type LetterFormProps = {
  /** When set, Try Again overwrites this id and stays on the page. */
  existingCoverLetter?: Pick<CoverLetter, "createdAt" | "id">;
  generateCoverLetter?: (details: CoverLetterDetails) => Promise<CoverLetter>;
  initialDetails?: CoverLetterDetails;
  onGenerated?: (letter: CoverLetter) => void;
  onGeneratingChange?: (isGenerating: boolean) => void;
  submitLabel?: string;
};

export function LetterForm({
  existingCoverLetter,
  generateCoverLetter = defaultGenerateCoverLetter,
  initialDetails = EMPTY_DETAILS,
  onGenerated,
  onGeneratingChange,
  submitLabel = "Generate Now",
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
      setStatusMessage("Generation failed. Could not generate the letter.");
      show({
        color: "critical",
        position: "bottom-end",
        text: "Could not generate the letter. Try again later.",
        title: "Generation failed",
      });
      setGenerating(false);
    }
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <View gap={4}>
        <FormHeader
          companyName={details.companyName}
          jobTitle={details.jobTitle}
        />

        <View direction="row" gap={4}>
          <View.Item columns={{ m: 6, s: 12 }}>
            <FormControl>
              <FormControl.Label>Job title</FormControl.Label>
              <TextField
                name="jobTitle"
                onChange={updateField("jobTitle")}
                placeholder="Product manager"
                value={details.jobTitle}
              />
            </FormControl>
          </View.Item>

          <View.Item columns={{ m: 6, s: 12 }}>
            <FormControl>
              <FormControl.Label>Company</FormControl.Label>
              <TextField
                name="companyName"
                onChange={updateField("companyName")}
                placeholder="Apple"
                value={details.companyName}
              />
            </FormControl>
          </View.Item>
        </View>

        <FormControl>
          <FormControl.Label>I am good at…</FormControl.Label>
          <TextField
            name="skills"
            onChange={updateField("skills")}
            placeholder="HTML, CSS and doing things in time"
            value={details.skills}
          />
        </FormControl>

        <FormControl hasError={detailsOverLimit}>
          <FormControl.Label>Additional details</FormControl.Label>
          <TextArea
            hasError={detailsOverLimit}
            inputAttributes={{
              "aria-invalid": detailsOverLimit,
            }}
            name="additionalDetails"
            onChange={updateField("additionalDetails")}
            placeholder="Describe why you are a great fit or paste your bio"
            resize="auto"
            value={details.additionalDetails}
          />
          <FormControl.Helper>
            <CharCounter
              length={details.additionalDetails.length}
              max={ADDITIONAL_DETAILS_MAX}
            />
          </FormControl.Helper>
        </FormControl>

        <Button
          attributes={
            isGenerating ? { "aria-label": GENERATING_STATUS } : undefined
          }
          color={isEdit && !isGenerating ? "neutral" : "positive"}
          disabled={!isValid || isGenerating}
          fullWidth
          icon={isEdit && !isGenerating ? RetryIcon : undefined}
          loading={isGenerating}
          loadingAriaLabel={GENERATING_STATUS}
          size="large"
          type="submit"
          variant={isEdit && !isGenerating ? "outline" : "solid"}
        >
          {submitLabel}
        </Button>

        <HiddenVisually>
          <div aria-live="polite" role="status">
            {statusMessage}
          </div>
        </HiddenVisually>
      </View>
    </form>
  );
}
