export enum ErrorCode {
  BAD_REQUEST = 4000,
  UNAUTHORIZED = 4001,
  FORBIDDEN = 4003,
  NOT_FOUND = 4004,
  NOT_ACCEPTABLE = 4006,
  CONFLICT = 4009,
  PAYLOAD_TOO_LARGE = 4013,
  UNPROCESSABLE_ENTITY = 4022,
  PAGE_ID_NOT_FOUND = 4100,
  POST_ID_NOT_FOUND = 4101,
  INSUFFICIENT_PERMISSION = 4103,
  BODY_FORMAT_ERROR = 4106,
  QUERY_TYPE_ERROR = 4107,
  BODY_EMPTY_ERROR = 4122,
  QUERY_EMPTY_ERROR = 4123,
  BIG_TABLE_ERROR = 4200,
  COMMENT_LIKE_TABLE_ERROR = 4300,
  OPERATION_TOO_FREQUENTLY = 4400,
}