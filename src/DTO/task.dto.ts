export interface CreateTaskDTO {
  title: string;
  description: string;
  username: string;
}

export interface UpdateTaskDTO {
  title: string | undefined;
  description: string | undefined;
  completedAt: string | undefined;
}
