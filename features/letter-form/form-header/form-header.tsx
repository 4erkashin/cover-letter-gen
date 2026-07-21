import { Text } from "reshaped";

import { coverLetterTitle } from "@/domain";

type FormHeaderProps = {
  companyName: string;
  jobTitle: string;
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

export function FormHeader({ companyName, jobTitle }: FormHeaderProps) {
  return (
    <Text as="h1" variant="title-3">
      {formHeaderTitle(jobTitle, companyName)}
    </Text>
  );
}
