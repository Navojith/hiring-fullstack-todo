import { Schema, model, Types } from 'mongoose';

export interface Todo {
  _id: Types.ObjectId;
  title: string;
  description?: string;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}

const TodoSchema = new Schema<Todo>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    done: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const TodoModel = model<Todo>('Todo', TodoSchema);
