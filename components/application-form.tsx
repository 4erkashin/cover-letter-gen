"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Button, View } from "reshaped";
import z from "zod";

import { APPLICATION_DETAILS_MAX_LENGTH } from "@/features/application";

import { FormField } from "./form-field";

const Schema = z.object({
  additionalDetails: z
    .string()
    .max(APPLICATION_DETAILS_MAX_LENGTH, "Additional details are too long"),
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  skills: z.string(),
});

export function ApplicationForm() {
  const form = useForm<z.infer<typeof Schema>>({
    defaultValues: {
      additionalDetails: "",
      companyName: "",
      jobTitle: "",
      skills: "",
    },
    resolver: zodResolver(Schema),
  });

  return (
    <FormProvider {...form}>
      <View
        as="form"
        attributes={{ onSubmit: form.handleSubmit(console.log, console.error) }}
        gap={3}
      >
        <FormField
          label="Job title"
          name="jobTitle"
          placeholder="Product manager"
        />

        <FormField label="Company" name="companyName" placeholder="Apple" />

        <FormField
          label="I am good at..."
          name="skills"
          placeholder="HTML, CSS and doing things in time"
        />

        <FormField
          label="Additional details"
          name="additionalDetails"
          placeholder="Describe why you are a great fit or paste your bio"
          type="textarea"
        />

        <Button fullWidth type="submit">
          Generate now
        </Button>
      </View>
    </FormProvider>
  );
}
