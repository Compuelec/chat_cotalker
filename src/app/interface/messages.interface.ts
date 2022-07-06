export interface MessageI {
  channel: string | null;
  content: string | null;
  contentType: string | null;
  isSaved: number | null;
  sentBy: string | null;
}
