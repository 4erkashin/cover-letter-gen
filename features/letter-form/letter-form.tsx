"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  Button,
  FormControl,
  TextArea,
  TextField,
  View,
  useToast,
} from "reshaped";

import type { CoverLetter, CoverLetterDetails } from "@/domain";
import { saveCoverLetter } from "@/features/persist-storage";
import { CharCounter } from "@/ui/char-counter";
import { FormHeader } from "@/ui/form-header";

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
};

export function LetterForm({
  generateCoverLetter = defaultGenerateCoverLetter,
}: LetterFormProps) {
  const router = useRouter();
  const { show } = useToast();
  const [details, setDetails] = useState<CoverLetterDetails>(EMPTY_DETAILS);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const detailsOverLimit = isAdditionalDetailsOverLimit(
    details.additionalDetails,
  );
  const isValid = isCoverLetterDetailsValid(details);

  const updateField =
    (field: keyof CoverLetterDetails) =>
    ({ value }: { value: string }) => {
      setDetails((current) => ({ ...current, [field]: value }));
    };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValid || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    try {
      const letter = await generateCoverLetter(details);
      saveCoverLetter(letter);
      router.replace(`/${letter.id}`);
    } catch {
      // Stay on /new with the form intact; nothing persisted.
      show({
        color: "critical",
        position: "bottom-end",
        title: "Generation failed",
        text: "Could not generate the letter. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
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
          disabled={!isValid || isSubmitting}
        >
          Generate Now
        </Button>
      </View>
    </form>
  );
}
