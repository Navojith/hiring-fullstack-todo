import { useState } from 'react';
import {
  useGetTodos,
  useAddTodo,
  useUpdateTodo,
  useToggleTodo,
  useDeleteTodo,
} from '@/hooks/useTodos';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { TodoResponseDto } from '@/interfaces/todo-response.interface';
import type { CreateTodoDto, UpdateTodoDto } from '@/interfaces/todo.interface';
import { Label } from '@/components/ui/label';
import { ButtonGroup } from '@/components/ui/button-group';
import { Trash2Icon, EditIcon, PlusIcon } from 'lucide-react';
import { FormProvider, useForm } from 'react-hook-form';
import TodoForm from './components/TodoForm';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { DialogType, TodoFormValues } from '@/types/common';
import { FileText } from 'lucide-react';

const Todo = () => {
  const { todoList, isLoading } = useGetTodos(true);
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();
  const toggleTodo = useToggleTodo();
  const deleteTodo = useDeleteTodo();

  const addForm = useForm<TodoFormValues>({
    defaultValues: { title: '', description: '' },
  });
  const editForm = useForm<TodoFormValues>({
    defaultValues: { title: '', description: '', done: false },
  });

  const [dialogType, setDialogType] = useState<DialogType>(undefined);
  const [editingTodo, setEditingTodo] = useState<TodoResponseDto | null>(null);

  const openAddDialog = () => {
    addForm.reset();
    setDialogType('ADD');
  };

  const openEditDialog = (todo: TodoResponseDto) => {
    setEditingTodo(todo);
    editForm.reset({
      title: todo.title,
      description: todo.description || '',
      done: todo.done,
    });
    setDialogType('EDIT');
  };

  const closeDialog = () => {
    setDialogType(undefined);
    setEditingTodo(null);
  };

  const handleAdd = (data: CreateTodoDto) => {
    addTodo.mutate(data);
    closeDialog();
  };

  const handleUpdate = (data: UpdateTodoDto) => {
    if (!editingTodo) return;
    updateTodo.mutate({ id: editingTodo.id, data });
    closeDialog();
  };

  const handleToggle = (todo: TodoResponseDto) => {
    toggleTodo.mutate(todo.id);
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  if (isLoading) return <p className="p-4">Loading todos...</p>;

  const currentForm = dialogType === 'EDIT' ? editForm : addForm;
  const handleSubmit =
    dialogType === 'EDIT'
      ? editForm.handleSubmit(handleUpdate)
      : addForm.handleSubmit(handleAdd);

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-4">
      {/* Todo List or Empty State */}
      {todoList?.data?.length ? (
        <div className="space-y-2">
          <div className="flex">
            <Button
              variant="outline"
              className="ml-auto"
              onClick={openAddDialog}
            >
              <PlusIcon className="w-5 h-5" /> Add Todo
            </Button>
          </div>
          {todoList.data.map((todo: TodoResponseDto) => (
            <div
              key={todo.id}
              className="flex items-center justify-between p-3 border rounded-md bg-muted text-foreground"
            >
              <div className="flex items-center gap-2">
                <Checkbox
                  id={todo.id}
                  checked={todo.done}
                  onCheckedChange={() => handleToggle(todo)}
                />
                <div>
                  <Label
                    htmlFor={todo.id}
                    className={`${
                      todo.done ? 'line-through text-muted-foreground' : ''
                    }`}
                  >
                    {todo.title}
                  </Label>
                  {todo.description && (
                    <p
                      className={`text-sm text-muted-foreground ${
                        todo.done ? 'line-through text-muted-foreground' : ''
                      }`}
                    >
                      {todo.description}
                    </p>
                  )}
                </div>
              </div>

              <ButtonGroup>
                <Button variant="outline" onClick={() => openEditDialog(todo)}>
                  <EditIcon />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDelete(todo.id)}
                >
                  <Trash2Icon />
                </Button>
              </ButtonGroup>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-12 border border-dashed rounded-xl bg-muted/20 text-center space-y-4">
          <FileText className="w-16 h-16 text-sky-500 mx-auto" />
          <h2 className="text-2xl font-bold">No Todos Yet</h2>
          <p className="text-muted-foreground max-w-xs">
            Your todo list is empty. Add tasks to stay organized and productive.
          </p>
          <Button onClick={openAddDialog} className="mt-2">
            <PlusIcon className="w-5 h-5 mr-2" /> Add Your First Todo
          </Button>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={!!dialogType} onOpenChange={closeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {dialogType === 'EDIT' ? 'Edit Todo' : 'Add Todo'}
            </DialogTitle>
          </DialogHeader>

          <FormProvider {...currentForm}>
            <form onSubmit={handleSubmit}>
              <TodoForm isEdit={dialogType === 'EDIT'} />
              <DialogFooter>
                <Button type="submit" className="mt-2">
                  {dialogType === 'EDIT' ? 'Save' : 'Add'}
                </Button>
              </DialogFooter>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Todo;
