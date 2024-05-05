import dayjs from "dayjs";

export function creationTime(created_at: string): string {
  return dayjs(created_at).format("DD/MM/YYYY HH:mm:ss");
}