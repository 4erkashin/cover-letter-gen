import { ApplicationForm } from "@/components/application-form";
import { PageHeader } from "@/components/page-header";

export default function CreateApplication() {
  return (
    <>
      <PageHeader>
        <h1>New application</h1>
      </PageHeader>

      <ApplicationForm />
    </>
  );
}
