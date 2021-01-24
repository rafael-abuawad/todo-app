import { Task } from './task.interface';

export interface List {
  id: number;
  title: string;
  description?: string;
  tasks: Task[];
  createdAt: Date;
}
