import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import * as uuid from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid().toString(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  getTaskById(taskId: string): Task {
    return this.tasks.find(({ id }) => taskId === id);
  }
}
