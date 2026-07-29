import { InformedError } from "@/ui/informed-error";

export default function UnknownRouteNotFound() {
  return <InformedError href="/" kind="unknown-route" />;
}
