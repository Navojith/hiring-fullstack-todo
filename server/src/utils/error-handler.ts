import { Request, Response, NextFunction } from 'express';
import logger from './logger';
import { ApiResponseDto } from '../dtos/responses/api-response.dto';
import { HttpException } from './http-exception';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err.stack ?? err.message ?? JSON.stringify(err));

  if (err instanceof HttpException) {
    return res.status(err.status).json(
      new ApiResponseDto<null>({
        success: false,
        message: err.message,
      })
    );
  }

  const status = err.status ?? 500;
  const message =
    err.message ?? 'Something went wrong. Please try again later.';

  res.status(status).json(
    new ApiResponseDto<null>({
      success: false,
      message,
    })
  );
}
