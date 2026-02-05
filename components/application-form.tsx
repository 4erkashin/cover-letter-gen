import { TextField, View } from "reshaped";
import z from "zod";

import { APPLICATION_DETAILS_MAX_LENGTH } from "@/features/application";

const Schema = z.object({
  additionalDetails: z
    .string()
    .max(APPLICATION_DETAILS_MAX_LENGTH, "Additional details are too long"),
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  skills: z.string(),
});

export function ApplicationForm() {
  return (
    <View as="form">
      <TextField name="jobTitle" placeholder="Product manager" />
    </View>
  );
}
