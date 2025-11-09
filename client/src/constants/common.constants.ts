import type { RequestType } from '../types/http';

export const HEADERS = {
  USER_ID_HEADER: 'x-user-id',
  TRACE_ID_HEADER: 'x-trace-id',
};

export const REQUEST_TYPE = {
  PUT: 'PUT' as RequestType,
  POST: 'POST' as RequestType,
  GET: 'GET' as RequestType,
  PATCH: 'PATCH' as RequestType,
  DELETE: 'DELETE' as RequestType,
  HEAD: 'HEAD' as RequestType,
  OPTIONS: 'OPTIONS' as RequestType,
};
