import { InformedError } from "@/ui/informed-error";

export default function UnknownRouteNotFound() {
  return <InformedError kind="unknown-route" />;
}
