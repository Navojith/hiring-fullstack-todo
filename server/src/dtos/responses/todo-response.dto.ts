import { Todo } from '../../models/todo.model';

export class TodoResponseDto {
  private readonly id: string;
  private readonly title: string;
  private readonly description?: string | undefined;
  private readonly done: boolean;
  private readonly createdAt: string;
  private readonly updatedAt: string;

  public constructor(entity: Todo) {
    this.id = entity._id.toString();
    this.title = entity.title;
    this.description = entity.description;
    this.done = entity.done;
    this.createdAt = entity.createdAt;
    this.updatedAt = entity.updatedAt;
  }
}
