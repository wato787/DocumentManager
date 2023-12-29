export const HttpStatus = {
  OK: 200,
  NO_CONTENT: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
  OTHER: 0,
} as const;

export type HttpStatusType = (typeof HttpStatus)[keyof typeof HttpStatus];
