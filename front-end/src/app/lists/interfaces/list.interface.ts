import { Task } from './task.dto';

export interface List {
  id: number;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: Date;
}
