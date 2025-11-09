import { Request, Response, NextFunction, RequestHandler } from 'express';

type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const asyncHandler =
  (fn: AsyncController): RequestHandler =>
  (req, res, next) => {
    fn(req, res, next)
      .then((result) => {
        if (result) {
          res.json(result);
        }
      })
      .catch(next);
  };
