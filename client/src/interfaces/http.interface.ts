export interface HttpHeaders {
  [key: string]: string | string[] | number | boolean;
}

export interface RequestParams {
  [key: string]: string | number | boolean | string[] | number[] | boolean[];
}

export interface ApiRequestOptions {
  headers?: HttpHeaders;
  params?: RequestParams;
  data?: unknown;
}
