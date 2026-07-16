import { Text } from "reshaped";

import { coverLetterTitle } from "@/domain";

type FormHeaderProps = {
  jobTitle: string;
  companyName: string;
};

function formHeaderTitle(jobTitle: string, companyName: string): string {
  const title = jobTitle.trim();
  const company = companyName.trim();

  if (!title && !company) {
    return "New application";
  }

  if (title && company) {
    return coverLetterTitle(title, company);
  }

  return title || company;
}

export function FormHeader({ jobTitle, companyName }: FormHeaderProps) {
  return (
    <Text variant="title-3" as="h1">
      {formHeaderTitle(jobTitle, companyName)}
    </Text>
  );
}
