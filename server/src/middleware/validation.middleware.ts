import { Request, Response, NextFunction } from 'express';
import { ApiResponseDto } from '../dtos/responses/api-response.dto';

export const validate =
  (schema: any) => (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
    });
    if (error) {
      const response = new ApiResponseDto<null>({
        message: 'Validation Error',
        success: false,
      });
      return res.status(400).json(response);
    }
    next();
  };
