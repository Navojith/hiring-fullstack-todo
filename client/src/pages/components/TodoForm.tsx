import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { TodoFormValues } from '@/types/common';
import { useFormContext, Controller } from 'react-hook-form';

const TodoForm = ({ isEdit = false }: { isEdit?: boolean }) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<TodoFormValues>();
  return (
    <div className="space-y-2">
      <div>
        <Input
          {...register('title', {
            required: 'Title is required',
            minLength: { value: 1, message: 'Min 1 characters' },
            maxLength: { value: 200, message: 'Max 200 characters' },
          })}
          placeholder="Title"
        />
        {errors.title && (
          <p className="text-red-500 text-sm">{errors.title.message}</p>
        )}
      </div>
      <div>
        <Input
          {...register('description', {
            maxLength: { value: 2000, message: 'Max 200 characters' },
          })}
          placeholder="Description"
        />
        {errors.description && (
          <p className="text-red-500 text-sm">{errors.description.message}</p>
        )}
      </div>
      {isEdit && (
        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name="done"
            defaultValue={false}
            render={({ field }) => (
              <Checkbox
                id="done-toggle"
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label htmlFor="done-toggle">Mark as done</Label>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
