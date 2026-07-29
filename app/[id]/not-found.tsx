import { InformedError } from "@/ui/informed-error";

export default function CoverLetterNotFound() {
  return <InformedError href="/" kind="missing-application" />;
}
