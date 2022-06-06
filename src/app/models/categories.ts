export interface Category {
  id: number;
  name: string;
}
export enum FetchStatus {
  idle = "idle",
  loading = "loading",
  failed = "failed",
}
