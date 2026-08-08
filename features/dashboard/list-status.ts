export type ListStatus = "empty" | "loading" | "populated";

export function listStatus(isLoading: boolean, count: number): ListStatus {
  if (isLoading) {
    return "loading";
  }

  if (count === 0) {
    return "empty";
  }

  return "populated";
}
