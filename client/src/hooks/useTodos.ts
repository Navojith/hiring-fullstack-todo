// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateTodoDto, UpdateTodoDto } from '@/interfaces/todo.interface';
import {
  createTodo,
  deleteTodo,
  getTodoList,
  toggleDoneTodo,
  updateTodo,
} from '@/service/todoService';

// --------- Fetch Todos ---------
export const useGetTodos = (enabled?: boolean) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['todoList'],
    queryFn: () => getTodoList(),
    enabled,
  });

  return {
    todoList: data,
    isLoading,
    error,
    refetch,
  };
};

// --------- Add Todo ---------
export const useAddTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, status, error, data, isPending, reset } =
    useMutation({
      mutationFn: async (data: CreateTodoDto) => {
        return createTodo(data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todoList'] });
      },
    });
  return { mutate, mutateAsync, status, error, data, isPending, reset };
};

// --------- Update Todo ---------
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, status, error, data, isPending, reset } =
    useMutation({
      mutationFn: async ({ id, data }: { id: string; data: UpdateTodoDto }) => {
        return updateTodo(id, data);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todoList'] });
      },
    });
  return { mutate, mutateAsync, status, error, data, isPending, reset };
};

// --------- Toggle Done ---------
export const useToggleTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, status, error, data, isPending, reset } =
    useMutation({
      mutationFn: async (id: string) => {
        const res = await toggleDoneTodo(id);
        return res?.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todoList'] });
      },
    });
  return { mutate, mutateAsync, status, error, data, isPending, reset };
};

// --------- Delete Todo ---------
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, status, error, data, isPending, reset } =
    useMutation({
      mutationFn: async (id: string) => {
        return deleteTodo(id);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todoList'] });
      },
    });
  return { mutate, mutateAsync, status, error, data, isPending, reset };
};
