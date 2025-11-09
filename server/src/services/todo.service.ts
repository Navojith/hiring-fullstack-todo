import { CreateTodoDto } from '../dtos/requests/create-todo.dto';
import { UpdateTodoDto } from '../dtos/requests/update-todo.dto';
import { TodoResponseDto } from '../dtos/responses/todo-response.dto';
import { TodoModel, Todo } from '../models/todo.model';
import { Types } from 'mongoose';
import { HttpException } from '../utils/http-exception';

export class TodoService {
  async list(): Promise<TodoResponseDto[] | undefined> {
    const list = await TodoModel.find().sort({ createdAt: -1 }).lean();
    return list.map((item) => this.mapToDto(item));
  }

  async create(payload: CreateTodoDto): Promise<TodoResponseDto | undefined> {
    const doc = new TodoModel(payload as Partial<Todo>);
    const res = await doc.save();
    return this.mapToDto(res);
  }

  async update(
    id: string | undefined,
    payload: UpdateTodoDto
  ): Promise<TodoResponseDto | undefined> {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new HttpException(400, 'Invalid ID format');
    }

    const updated = await TodoModel.findByIdAndUpdate(id, payload, {
      new: true,
    }).lean();
    if (!updated) {
      throw new HttpException(404, 'Todo not found');
    }
    return this.mapToDto(updated);
  }

  async toggleDone(
    id: string | undefined
  ): Promise<TodoResponseDto | undefined> {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new HttpException(400, 'Invalid ID format');
    }
    const todo = await TodoModel.findById(id);

    if (!todo) {
      throw new HttpException(404, 'Todo not found');
    }

    todo.done = !todo.done;
    return this.mapToDto(await todo.save());
  }

  async remove(id: string | undefined): Promise<TodoResponseDto | undefined> {
    if (!id || !Types.ObjectId.isValid(id)) {
      throw new HttpException(400, 'Invalid ID format');
    }

    const res = await TodoModel.findByIdAndDelete(id).lean();
    if (!res) {
      throw new HttpException(404, 'Todo not found');
    }

    return this.mapToDto(res);
  }

  mapToDto(item: Todo): TodoResponseDto {
    return new TodoResponseDto(item);
  }
}

export default new TodoService();
