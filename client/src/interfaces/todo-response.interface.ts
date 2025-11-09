export interface TodoResponseDto {
  id: string;
  title: string;
  description?: string | undefined;
  done: boolean;
  createdAt: string;
  updatedAt: string;
}
