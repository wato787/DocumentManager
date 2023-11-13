export const Status = {
  SUCCESS: "success",
  ERROR: "error",
  LOADING: "loading",
} as const;

export type Status = (typeof Status)[keyof typeof Status];
