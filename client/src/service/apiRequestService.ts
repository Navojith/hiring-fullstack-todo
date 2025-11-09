// src/services/apiRequestService.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';
import { REQUEST_TYPE } from '../constants/common.constants.ts';
import type {
  HttpHeaders,
  RequestParams,
} from '../interfaces/http.interface.ts';
import type { RequestType } from '../types/http.d.ts';
// import TokenService from "./tokenService";
// import { refreshTokenApi } from "./authService";
// import type { AuthenticationResponse } from "../interfaces/auth.interface";

class APIRequestService {
  private instance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.instance = axios.create();
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't already tried to refresh
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // If already refreshing, queue the request
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.instance(originalRequest);
              })
              .catch((err) => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;
        }

        // Handle other error cases
        if (error.response?.status === 403) {
          throw new Error('API not available');
        }

        if (!axios.isCancel(error)) {
          console.error('API Request Error:', error);
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: any): void {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });

    this.failedQueue = [];
  }

  async sendRequest<TResponse = unknown, TBody = unknown>(
    url: string,
    method: RequestType = REQUEST_TYPE.GET,
    headers: HttpHeaders = {},
    params: RequestParams = {},
    body?: TBody,
    signal?: AbortSignal
  ): Promise<TResponse> {
    try {
      const config: AxiosRequestConfig<TBody> = {
        url,
        method,
        headers,
        params,
        ...(body && { data: body }),
        signal,
      };

      const response = await this.instance<TResponse>(config);
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        throw new Error('Request was cancelled');
      }
      throw error;
    }
  }
}

export default new APIRequestService();
