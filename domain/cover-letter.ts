export type IsoDatetimeString = string;

export interface CoverLetter {
  id: string;
  title: string;
  content: string;
  createdAt: IsoDatetimeString;
  updatedAt: IsoDatetimeString;
}
