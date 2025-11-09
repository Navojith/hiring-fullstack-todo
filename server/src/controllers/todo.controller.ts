import { NextFunction, Request, Response } from 'express';
import todoService from '../services/todo.service';
import { ApiResponseDto } from '../dtos/responses/api-response.dto';
import { Todo } from '../models/todo.model';
import { TodoResponseDto } from '../dtos/responses/todo-response.dto';

export const TodoController = {
  list: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponseDto<TodoResponseDto[] | undefined>> => {
    const data = await todoService.list();
    return new ApiResponseDto<TodoResponseDto[] | undefined>({
      data: data,
      message: 'Todo items fetched successfully',
    });
  },

  create: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponseDto<TodoResponseDto | undefined>> => {
    const payload = req.body;
    const data = await todoService.create(payload);
    return new ApiResponseDto<TodoResponseDto | undefined>({
      data: data,
      message: 'Todo created successfully',
    });
  },

  update: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponseDto<TodoResponseDto | undefined>> => {
    const { id } = req.params;
    const payload = req.body;
    const data = await todoService.update(id, payload);
    return new ApiResponseDto<TodoResponseDto | undefined>({
      data: data,
      message: 'Todo updated successfully',
    });
  },

  toggleDone: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponseDto<TodoResponseDto | undefined>> => {
    const { id } = req.params;
    const data = await todoService.toggleDone(id);
    return new ApiResponseDto<TodoResponseDto | undefined>({
      data: data,
      message: 'Todo status toggled successfully',
    });
  },

  remove: async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<ApiResponseDto<TodoResponseDto | undefined>> => {
    const { id } = req.params;
    const data = await todoService.remove(id);
    return new ApiResponseDto<TodoResponseDto | undefined>({
      data: data,
      message: 'Todo deleted successfully',
    });
  },
};
