import { InformedError } from "@/ui";

export default function UnknownRouteNotFound() {
  return <InformedError kind="unknown-route" />;
}
