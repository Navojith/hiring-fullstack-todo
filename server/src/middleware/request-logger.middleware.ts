import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { method, originalUrl, query, body } = req;

  const bodyLog = ['POST', 'PUT', 'PATCH'].includes(method) ? body : undefined;
  const queryLog = Object.keys(query).length ? query : '';

  logger.info(
    `${method} ${originalUrl}${queryLog ? ` - query: ${JSON.stringify(queryLog)}` : ''}${
      bodyLog ? ` - body: ${JSON.stringify(bodyLog)}` : ''
    }`
  );

  next();
};
