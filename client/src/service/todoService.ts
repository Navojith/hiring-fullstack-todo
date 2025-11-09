import { REQUEST_TYPE } from '@/constants/common.constants';
import apiRequestService from './apiRequestService';
import type { ApiResponseDto } from '@/interfaces/api-response.interface';
import type { TodoResponseDto } from '@/interfaces/todo-response.interface';
import type { CreateTodoDto, UpdateTodoDto } from '@/interfaces/todo.interface';

export const TODO_BASE_URL = `${import.meta.env.VITE_BACKEND_URL}/todos`;

export const getTodoList = async (): Promise<
  ApiResponseDto<TodoResponseDto[]> | undefined
> => {
  try {
    const response = await apiRequestService.sendRequest<
      ApiResponseDto<TodoResponseDto[]>,
      undefined
    >(TODO_BASE_URL, REQUEST_TYPE.GET);

    if (response && response.success) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

export const createTodo = async (
  data: CreateTodoDto
): Promise<ApiResponseDto<TodoResponseDto> | undefined> => {
  try {
    const response = await apiRequestService.sendRequest<
      ApiResponseDto<TodoResponseDto>,
      CreateTodoDto
    >(TODO_BASE_URL, REQUEST_TYPE.POST, undefined, undefined, data);

    if (response && response.success) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateTodo = async (
  id: string,
  data: UpdateTodoDto
): Promise<ApiResponseDto<TodoResponseDto> | undefined> => {
  try {
    const response = await apiRequestService.sendRequest<
      ApiResponseDto<TodoResponseDto>,
      UpdateTodoDto
    >(`${TODO_BASE_URL}/${id}`, REQUEST_TYPE.PUT, undefined, undefined, data);

    if (response && response.success) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

export const toggleDoneTodo = async (
  id: string
): Promise<ApiResponseDto<TodoResponseDto> | undefined> => {
  try {
    const response = await apiRequestService.sendRequest<
      ApiResponseDto<TodoResponseDto>,
      undefined
    >(`${TODO_BASE_URL}/${id}/done`, REQUEST_TYPE.PATCH);

    if (response && response.success) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = async (
  id: string
): Promise<ApiResponseDto<TodoResponseDto> | undefined> => {
  try {
    const response = await apiRequestService.sendRequest<
      ApiResponseDto<TodoResponseDto>,
      undefined
    >(`${TODO_BASE_URL}/${id}`, REQUEST_TYPE.DELETE);

    if (response && response.success) {
      return response;
    }
  } catch (err) {
    console.error(err);
  }
};
