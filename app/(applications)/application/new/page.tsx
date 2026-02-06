import { ApplicationForm } from "@/components/application-form";
import { CoverLetterWidget } from "@/components/cover-letter-widget";
import { PageHeader } from "@/components/page-header";

export default function CreateApplication() {
  return (
    <>
      <PageHeader>
        <h1>New application</h1>
      </PageHeader>

      <ApplicationForm />

      <CoverLetterWidget />
    </>
  );
}
